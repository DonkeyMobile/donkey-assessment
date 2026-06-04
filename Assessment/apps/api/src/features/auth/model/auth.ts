import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { genericOAuth } from "better-auth/plugins";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { prisma } from "../../../shared/db/index.js";
import { env } from "../../../shared/config/index.js";
import { roleFromClaims } from "../../../entities/user/index.js";
import { USER_ROLES } from "@donkey/shared";

// Keycloak signing keys, fetched (and cached) from the back-channel JWKS endpoint.
const keycloakJwks = createRemoteJWKSet(
  new URL(`${env.keycloak.internalUrl}/protocol/openid-connect/certs`)
);

export const auth = betterAuth({
  secret: env.betterAuthSecret,
  baseURL: env.betterAuthUrl,
  // The browser only ever talks to the web origin (Next proxies /api/* to us),
  // so the trusted origin is the web app.
  trustedOrigins: [env.betterAuthUrl],
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  user: {
    additionalFields: {
      role: {
        type: [USER_ROLES.user, USER_ROLES.admin],
        required: false,
        defaultValue: USER_ROLES.user,
        input: false, // role is derived from Keycloak, never user-supplied
      },
    },
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "keycloak",
          clientId: env.keycloak.clientId,
          clientSecret: env.keycloak.clientSecret,
          // Browser-facing endpoint for the redirect.
          authorizationUrl: `${env.keycloak.publicUrl}/protocol/openid-connect/auth`,
          // Back-channel endpoint reached from inside the compose network.
          tokenUrl: `${env.keycloak.internalUrl}/protocol/openid-connect/token`,
          scopes: ["openid", "profile", "email"],
          pkce: true,
          // The issuer (`iss`) claim is fixed by Keycloak's hostname config to the
          // public URL, so it stays constant regardless of the back-channel host.
          issuer: env.keycloak.publicUrl,
          requireIssuerValidation: true,
          // Refresh the derived role on every sign-in.
          overrideUserInfo: true,
          // Build the user from the access token. The token is verified against
          // Keycloak's JWKS (signature + issuer) before any claim — including the
          // admin role — is trusted.
          getUserInfo: async (tokens) => {
            if (!tokens.accessToken) {
              return null;
            }
            const { payload } = await jwtVerify(tokens.accessToken, keycloakJwks, {
              issuer: env.keycloak.publicUrl,
            });
            const claims = payload as Record<string, unknown>;

            const sub = (claims.sub as string) ?? "";
            const email = (claims.email as string) ?? (claims.preferred_username as string) ?? sub;
            const name = (claims.name as string) ?? (claims.preferred_username as string) ?? email;

            return {
              id: sub,
              email,
              emailVerified: Boolean(claims.email_verified ?? false),
              name,
              image: undefined,
              role: roleFromClaims(claims),
            };
          },
        },
      ],
    }),
  ],
});

export type Auth = typeof auth;
