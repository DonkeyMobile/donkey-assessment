"use client";

import { createAuthClient } from "better-auth/react";
import { genericOAuthClient } from "better-auth/client/plugins";

/**
 * BetterAuth client. baseURL defaults to the current origin, so requests hit
 * /api/auth/* on the web app and are proxied to the API (first-party cookies).
 */
export const authClient = createAuthClient({
  plugins: [genericOAuthClient()],
});

export const { useSession, signOut } = authClient;
