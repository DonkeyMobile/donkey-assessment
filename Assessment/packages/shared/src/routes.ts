export const API_VERSION = "v1";
export const API_BASE = `/api/${API_VERSION}`;

/**
 * Public endpoints return only published content; admin endpoints (behind the
 * `admin` role) expose the full collection and all mutations.
 */
export const ApiRoutes = {
  items: `${API_BASE}/items`,
  item: (id: string) => `${API_BASE}/items/${id}`,
  adminItems: `${API_BASE}/admin/items`,
  adminItem: (id: string) => `${API_BASE}/admin/items/${id}`,
  adminReset: `${API_BASE}/admin/items/reset`,
  /** Ends the BetterAuth session + the Keycloak SSO session (RP-initiated). */
  logout: "/api/logout",
  health: "/health",
} as const;
