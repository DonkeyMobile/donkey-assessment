import type { Request, RequestHandler, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import type { PrismaClient } from "@prisma/client";
import type { Auth } from "../model/auth.js";

interface Deps {
  auth: Auth;
  prisma: Pick<PrismaClient, "account">;
  /** Browser-facing Keycloak realm URL. */
  keycloakPublicUrl: string;
  clientId: string;
  /** Where Keycloak sends the browser after logout (must match the client config). */
  postLogoutRedirectUri: string;
}

/**
 * Logout handler: revokes the BetterAuth session and then redirects the browser
 * to Keycloak's end-session endpoint (RP-initiated logout), so the IdP SSO
 * session is cleared too. BetterAuth and Keycloak are only touched here, in the
 * API.
 */
export function makeLogoutHandler({
  auth,
  prisma,
  keycloakPublicUrl,
  clientId,
  postLogoutRedirectUri,
}: Deps): RequestHandler {
  return async (req: Request, res: Response): Promise<void> => {
    const headers = fromNodeHeaders(req.headers);
    const session = await auth.api.getSession({ headers });

    let idToken: string | undefined;
    if (session) {
      const account = await prisma.account.findFirst({
        where: { userId: session.user.id, providerId: "keycloak" },
        orderBy: { updatedAt: "desc" },
      });
      idToken = account?.idToken ?? undefined;

      // Revoke the session and relay the cookie-clearing headers to the browser.
      const signOutResponse = await auth.api.signOut({ headers, asResponse: true });
      for (const cookie of signOutResponse.headers.getSetCookie()) {
        res.append("set-cookie", cookie);
      }
    }

    const url = new URL(`${keycloakPublicUrl}/protocol/openid-connect/logout`);
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("post_logout_redirect_uri", postLogoutRedirectUri);
    if (idToken) {
      url.searchParams.set("id_token_hint", idToken);
    }
    res.redirect(url.toString());
  };
}
