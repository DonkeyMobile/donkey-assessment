import { headers } from "next/headers";
import type { ServerSession } from "../model/types";

function resolveApiUrl(): string {
  const url = process.env.API_INTERNAL_URL;
  if (url) {
    return url;
  }
  if (process.env.NODE_ENV !== "development") {
    throw new Error("API_INTERNAL_URL is required outside development");
  }
  return "http://localhost:4000";
}

const apiUrl = resolveApiUrl();

/**
 * Resolve the current session server-side by calling BetterAuth's
 * get-session endpoint on the API with the forwarded cookies.
 */
export async function getServerSession(): Promise<ServerSession | null> {
  const cookie = (await headers()).get("cookie") ?? "";
  if (!cookie) {
    return null;
  }

  try {
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
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("getServerSession: failed to resolve session", err);
    return null;
  }
}
