import { USER_ROLES, type UserRole } from "@donkey/shared";

/**
 * Derive the application role from Keycloak token claims.
 * Keycloak exposes realm roles under `realm_access.roles` on the access token.
 * Pure function — easy to unit test without a running IdP.
 */
export function roleFromClaims(claims: Record<string, unknown>): UserRole {
  const realmAccess = claims.realm_access as { roles?: unknown } | undefined;
  const roles = Array.isArray(realmAccess?.roles) ? realmAccess.roles : [];
  return roles.includes(USER_ROLES.admin) ? USER_ROLES.admin : USER_ROLES.user;
}
