# Inspire Store — Fullstack Assessment Solution

A publicly browsable store of inspiring content, with an admin panel behind a
real login. Authentication runs against a locally virtualised identity provider
(**Keycloak**), the store data lives in a real **Postgres** database behind an
**Express + Prisma** API, and the frontend is **Next.js**. Everything starts
with a single command.

## Quick start

```bash
docker compose up --build
```

Then open <http://localhost:3000>.

- **Public store** — visible immediately, no login required.
- **Sign in** (top right) — redirects to Keycloak. Use one of the seeded users:
  - `alice` / `password` — has the `admin` realm role → full admin panel.
  - `bob` / `password` — regular user → "Access denied" on `/admin`.

> Defaults work without any configuration. To customise, copy `.env.example` to
> `.env`. (A local `.env` may already remap host ports to avoid clashes with
> other services — see "Ports" below.)

## Architecture

```
                 ┌────────────────────────────────────────────┐
                 │              docker compose up             │
                 ├────────────┬──────────────┬────────────────┤
   browser ─────▶│  web       │   api        │   keycloak     │
                 │ Next.js    │  Express +   │   (IdP, OIDC)  │
                 │ (frontend, │  BetterAuth +│                │
                 │  no DB)    │  Prisma      │                │
                 └─────┬──────┴──────┬───────┴────────┬───────┘
                   proxy /api/*      │                │
                       └────────────▶│◀── OIDC ───────┘
                                ┌────▼────┐
                                │ postgres│  (auth + store)
                                └─────────┘
```

| Service    | Tech                                              | Responsibility                               |
| ---------- | ------------------------------------------------- | -------------------------------------------- |
| `web`      | Next.js 15, Tailwind, RTK Query, Zod              | UI only. No database. RTK Query → `/api/*`.  |
| `api`      | Express, BetterAuth, Prisma (versioned `/api/v1`) | Auth + store data. The only data owner.      |
| `keycloak` | Keycloak 26                                       | Identity provider (OIDC). Realm auto-import. |
| `postgres` | Postgres 16                                       | BetterAuth tables + store tables.            |

### API versioning & client data

- Business endpoints are versioned under **`/api/v1`** (e.g. `/api/v1/items`);
  auth (`/api/auth/*`) and `/health` are intentionally unversioned. The version
  lives in one place (`API_VERSION` in `@donkey/shared`).
- The web app talks to the API exclusively through **RTK Query** (`baseApi` +
  per-slice `injectEndpoints`), with tag-based cache invalidation so a create or
  delete refetches the list automatically.
- Admin form input is validated with **Zod** before any mutation fires.

### Auth flow

1. The browser only ever talks to the web origin. Next.js **rewrites** proxy
   `/api/*` to the API, so BetterAuth cookies stay first-party (no CORS).
2. Clicking "Sign in" starts BetterAuth's `genericOAuth` flow against Keycloak.
3. Keycloak authenticates and redirects back to BetterAuth, which creates a
   session and persists the user in Postgres.
4. The app **role** is derived from the Keycloak realm roles
   (`realm_access.roles`) in the access token and stored on the BetterAuth user.
5. The admin page checks the session server-side; the API additionally enforces
   the `admin` role on every mutation (`POST`/`PUT`/`DELETE`). Reads are public.

## Project layout (Yarn workspaces monorepo)

```
apps/
  web/    Next.js frontend (no DB)
  api/    Express + BetterAuth + Prisma (owns Postgres)
packages/
  shared/ Shared TypeScript types / API contract
keycloak/
  realm-export.json   Realm, OIDC client, roles, seeded users
docker-compose.yml
```

Both apps follow **Feature-Sliced Design (FSD)**: layered slices with a public
API (`index.ts`) per slice and strictly downward imports
(`app → widgets → features → entities → shared`).

```
apps/web/src/                         apps/api/src/
  app/        Next routing, store,       app/        Express composition (makeApp)
              providers                  features/   auth, view-store, manage-items
  widgets/    header, store-grid,        entities/   inspiration-item, user
              admin-panel                shared/     db, config, middleware
  features/   auth, manage-items
              (RTK Query + Zod)
  entities/   inspiration-item (RTKQ),
              session
  shared/     api (RTK Query baseApi),
              auth
```

The backend adapts FSD's UI-oriented layers to a service: the `ui` segment
becomes `routes`, `entities/*/api` holds data access (repositories), and the
admin guard lives in `shared` and is injected by the `app` layer so features
never import one another.

## Key choices & rationale

- **Real API + Postgres instead of mocked data.** The brief allows mocking, but
  a real Express + Prisma + Postgres layer demonstrates the full stack and makes
  the admin CRUD genuinely persistent.
- **Keycloak as the "local virtualised service".** A real OIDC identity provider
  in Docker, with its realm, client, roles and test users imported on boot, so
  the whole login works from the first `docker compose up`.
- **BetterAuth on the API, not in the web app.** The web app persists nothing;
  the API is the single owner of both auth state and store data. The web app is
  a pure frontend that proxies to the API.
- **JWT-derived authorization at the API.** Keycloak is the source of truth for
  identity and roles; the API enforces the `admin` role on each mutating
  endpoint rather than trusting the network.
- **Issuer consistency.** Keycloak's hostname is pinned so the token `iss` claim
  is stable; the API uses a browser-facing URL for the authorization redirect and
  an internal URL for the back-channel token exchange.

## Tests

```bash
yarn test        # API unit/route tests (Vitest) + web component tests (Vitest + RTL)
yarn test:e2e    # Playwright E2E against the running stack (start it first)
```

- **API (Vitest + supertest):** `requireAdmin` guard (401/403/allow), item route
  handlers with a mocked Prisma, role derivation from Keycloak claims.
- **Web (Vitest + React Testing Library):** store grid rendering, Zod form
  validation, and the admin panel (RTK Query hooks mocked) — invalid input is
  blocked, valid input fires the create mutation.
- **E2E (Playwright):** public store without login, admin redirect when signed
  out, and the full happy path — Keycloak login → admin → create item → it shows
  up on the public store.

First-time E2E setup: `yarn workspace @donkey/web exec playwright install chromium`.

## Tooling & conventions

Aligned with the Jump frontend template:

- **Prettier**: double quotes, `trailingComma: es5`, 100 cols, semicolons;
  `.prettierignore`; `yarn format` / `format:check`.
- **ESLint (web)**: flat config (`eslint.config.mjs`, ESLint 9) extending
  `next/core-web-vitals` + `next/typescript`, with `curly: all` and the
  `react-you-might-not-need-an-effect` plugin.
- **Node**: `.nvmrc` = 22 (required by BetterAuth/kysely).
- **UI**: lucide-react icons + a `cn()` helper (clsx + tailwind-merge); the
  custom Donkey wordmark stays hand-drawn.
- **Forms**: react-hook-form with the shared Zod schema as resolver.

## Docker build

A single multi-stage `Dockerfile` with a shared `deps` stage installs the
workspace once (reused by the `api` and `web` targets) and uses a BuildKit
cache mount for the yarn cache, so rebuilds go from minutes to ~2s. The web
image ships Next's **standalone** output for a slim runtime.

## Ports

Defaults: web `3000`, api `4000`, keycloak `8080`, postgres `5432`. Each host
port is overridable via `.env` (`API_HOST_PORT`, `KEYCLOAK_HOST_PORT`,
`POSTGRES_HOST_PORT`). When changing the Keycloak host port, also set
`KEYCLOAK_HOSTNAME_URL` and `KEYCLOAK_PUBLIC_URL` to match so the OIDC redirect
stays consistent.

## Useful commands

```bash
docker compose up --build      # run everything
docker compose logs -f api     # follow API logs
docker compose down            # stop
docker compose down -v         # stop and wipe the database volume
yarn workspace @donkey/api prisma:migrate   # create a new migration (dev)
```
