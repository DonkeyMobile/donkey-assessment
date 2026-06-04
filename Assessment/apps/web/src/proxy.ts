import { NextResponse, type NextRequest } from "next/server";

/**
 * Coarse gate for /admin: redirect to the home page when there is no session
 * cookie at all. The fine-grained role check (admin vs user) happens in the
 * admin page server component via getServerSession.
 *
 */
export function proxy(request: NextRequest) {
  // Match the session cookie incl. production secure-cookie prefixes
  // (__Secure-/__Host-), which BetterAuth uses over HTTPS.
  const hasSession = request.cookies.getAll().some((c) => c.name.includes("better-auth.session"));

  if (!hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
