/** Centralised, validated environment access for the API. */

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  port: Number(process.env.API_PORT ?? 4000),
  databaseUrl: required("DATABASE_URL"),

  betterAuthSecret: required("BETTER_AUTH_SECRET"),
  betterAuthUrl: required("BETTER_AUTH_URL"),

  keycloak: {
    clientId: required("KEYCLOAK_CLIENT_ID"),
    clientSecret: required("KEYCLOAK_CLIENT_SECRET"),
    // Browser-facing realm URL (authorization redirect).
    publicUrl: required("KEYCLOAK_PUBLIC_URL"),
    // Internal realm URL (back-channel token exchange).
    internalUrl: required("KEYCLOAK_INTERNAL_URL"),
  },
} as const;
