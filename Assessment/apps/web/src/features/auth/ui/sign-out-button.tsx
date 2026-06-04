"use client";

import { ApiRoutes } from "@donkey/shared";
import { Button, Icon } from "@/shared/ui";

type Variant = "outline" | "ghost" | "ghostLight";

/**
 * Signs out via the API logout endpoint, which ends both the BetterAuth session
 * and the Keycloak SSO session and then redirects back to the public site.
 * (BetterAuth and Keycloak are only ever called from the API.)
 */
export function SignOutButton({ variant = "outline" }: { variant?: Variant }) {
  return (
    <Button variant={variant} size="sm" onClick={() => window.location.assign(ApiRoutes.logout)}>
      <Icon.logout size={15} /> Uitloggen
    </Button>
  );
}
