import express, {
  type ErrorRequestHandler,
  type Express,
  type RequestHandler,
  type Router,
} from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { ApiRoutes } from "@donkey/shared";

interface AppDeps {
  /** Public read routes (published content). */
  readRouter: Router;
  /** Admin routes (full CRUD + reset, guarded). */
  adminRouter: Router;
  /** Optional BetterAuth node handler mounted on /api/auth/*. */
  authHandler?: RequestHandler;
  /** Optional logout handler (BetterAuth + Keycloak RP-initiated logout). */
  logoutHandler?: RequestHandler;
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const AUTH_RATE_LIMIT_MAX = 100;
const ADMIN_RATE_LIMIT_MAX = 300;
const JSON_BODY_LIMIT = "100kb";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  // Prisma "record not found" → 404 instead of a generic 500.
  if ((err as { code?: string }).code === "P2025") {
    res.status(404).json({ error: "not found" });
    return;
  }
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ error: "internal server error" });
};

/** Compose the Express app from its slices (keeps it testable). */
export function makeApp({ readRouter, adminRouter, authHandler, logoutHandler }: AppDeps): Express {
  const app = express();

  app.use(helmet());

  const limiterOptions = {
    windowMs: RATE_LIMIT_WINDOW_MS,
    standardHeaders: true as const,
    legacyHeaders: false as const,
  };
  const authLimiter = rateLimit({ ...limiterOptions, limit: AUTH_RATE_LIMIT_MAX });
  const adminLimiter = rateLimit({ ...limiterOptions, limit: ADMIN_RATE_LIMIT_MAX });

  // BetterAuth handler must be mounted BEFORE express.json().
  if (authHandler) {
    // Express 5 (path-to-regexp v8) requires a named wildcard segment.
    app.all("/api/auth/*splat", authLimiter, authHandler);
  }

  app.use(express.json({ limit: JSON_BODY_LIMIT }));

  app.get(ApiRoutes.health, (_req, res) => {
    res.json({ status: "ok" });
  });

  if (logoutHandler) {
    app.get(ApiRoutes.logout, logoutHandler);
  }

  app.use(ApiRoutes.items, readRouter);
  app.use(ApiRoutes.adminItems, adminLimiter, adminRouter);

  app.use(errorHandler);

  return app;
}
