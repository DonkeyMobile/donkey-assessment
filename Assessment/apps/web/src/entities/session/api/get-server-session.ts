import { headers } from "next/headers";
import type { ServerSession } from "../model/types";

const apiUrl = process.env.API_INTERNAL_URL ?? "http://localhost:4000";

/**
 * Resolve the current session server-side by calling BetterAuth's
 * get-session endpoint on the API with the forwarded cookies.
 */
export async function getServerSession(): Promise<ServerSession | null> {
  const cookie = (await headers()).get("cookie") ?? "";
  if (!cookie) {
    return null;
  }

  const res = await fetch(`${apiUrl}/api/auth/get-session`, {
    headers: { cookie },
    cache: "no-store",
  });
  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as { user?: ServerSession["user"] } | null;
  if (!data || !data.user) {
    return null;
  }
  return { user: data.user };
}
