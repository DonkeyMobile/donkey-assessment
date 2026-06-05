# syntax=docker/dockerfile:1
# Multi-stage build for the whole monorepo.
# A single shared `deps` stage installs the workspace once (BuildKit caches the
# yarn download cache), and the api/web images are built from it.

FROM node:22-alpine@sha256:968df39aedcea65eeb078fb336ed7191baf48f972b4479711397108be0966920 AS base
# Prisma needs OpenSSL on Alpine/musl.
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app

# --- deps: install all workspace dependencies once ---
FROM base AS deps
COPY package.json yarn.lock tsconfig.base.json ./
COPY packages/shared/package.json packages/shared/package.json
COPY apps/api/package.json apps/api/package.json
COPY apps/web/package.json apps/web/package.json
RUN --mount=type=cache,target=/usr/local/share/.cache/yarn \
    yarn install --frozen-lockfile --prefer-offline

# --- api runtime (tsx) ---
FROM deps AS api
COPY packages/shared packages/shared
COPY apps/api apps/api
RUN yarn workspace @donkey/api prisma:generate
WORKDIR /app/apps/api
RUN chmod +x docker-entrypoint.sh
# Drop to the unprivileged `node` user (uid 1000, shipped by node:alpine).
RUN chown -R node:node /app
USER node
EXPOSE 4000
ENTRYPOINT ["sh", "docker-entrypoint.sh"]

# --- web build ---
FROM deps AS web-build
COPY packages/shared packages/shared
COPY apps/web apps/web
# Next bakes rewrite destinations at build time → API URL must be present now.
ARG API_INTERNAL_URL=http://api:4000
ENV API_INTERNAL_URL=${API_INTERNAL_URL}
RUN yarn workspace @donkey/web build

# --- web runtime (Next standalone, slim) ---
FROM base AS web
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000
WORKDIR /app
COPY --from=web-build --chown=node:node /app/apps/web/.next/standalone ./
COPY --from=web-build --chown=node:node /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=web-build --chown=node:node /app/apps/web/public ./apps/web/public
# Run the Next server as the unprivileged `node` user.
USER node
EXPOSE 3000
CMD ["node", "apps/web/server.js"]
