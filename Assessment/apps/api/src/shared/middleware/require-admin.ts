import type { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { USER_ROLES } from "@donkey/shared";

/** Minimal session shape the guard needs. */
export interface GuardSession {
  user: { id: string; role?: string | null };
}

export type SessionGetter = (headers: Headers) => Promise<GuardSession | null>;

/**
 * Express guard factory. Allows the request only when there is a valid session
 * whose user has the `admin` role (derived from Keycloak). Returns 401 when
 * unauthenticated and 403 when authenticated but not an admin.
 *
 * Takes the session getter as a dependency so it can be unit-tested without a
 * real BetterAuth instance or database, and so the auth feature is injected by
 * the app layer rather than imported across slices.
 */
export function createRequireAdmin(getSession: SessionGetter) {
  return async function requireAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const session = await getSession(fromNodeHeaders(req.headers));
      if (!session) {
        res.status(401).json({ error: "unauthenticated" });
        return;
      }
      if (session.user.role !== USER_ROLES.admin) {
        res.status(403).json({ error: "forbidden" });
        return;
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
