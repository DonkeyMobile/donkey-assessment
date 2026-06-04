import { describe, expect, it, vi } from "vitest";
import type { Request, Response } from "express";
import { makeLogoutHandler } from "../src/features/auth/api/keycloak-logout.js";

const KEYCLOAK_URL = "https://keycloak.test/realms/donkey";
const CLIENT_ID = "donkey-web";
const REDIRECT_URI = "https://app.test/";

function makeDeps(overrides: {
  session: { user: { id: string } } | null;
  idToken?: string | null;
  cookies?: string[];
}) {
  const getSession = vi.fn().mockResolvedValue(overrides.session);
  const signOut = vi.fn().mockResolvedValue({
    headers: { getSetCookie: () => overrides.cookies ?? [] },
  });
  const findFirst = vi
    .fn()
    .mockResolvedValue(overrides.idToken === undefined ? null : { idToken: overrides.idToken });

  const handler = makeLogoutHandler({
    auth: { api: { getSession, signOut } } as never,
    prisma: { account: { findFirst } } as never,
    keycloakPublicUrl: KEYCLOAK_URL,
    clientId: CLIENT_ID,
    postLogoutRedirectUri: REDIRECT_URI,
  });

  return { handler, getSession, signOut, findFirst };
}

function makeReqRes() {
  const req = { headers: {} } as Request;
  const res = { append: vi.fn(), redirect: vi.fn() } as unknown as Response & {
    append: ReturnType<typeof vi.fn>;
    redirect: ReturnType<typeof vi.fn>;
  };
  return { req, res };
}

describe("makeLogoutHandler", () => {
  it("redirects to Keycloak end-session without signing out when there is no session", async () => {
    const { handler, signOut, findFirst } = makeDeps({ session: null });
    const { req, res } = makeReqRes();

    await handler(req, res, vi.fn());

    expect(signOut).not.toHaveBeenCalled();
    expect(findFirst).not.toHaveBeenCalled();

    const redirectUrl = new URL(res.redirect.mock.calls[0][0]);
    expect(redirectUrl.origin + redirectUrl.pathname).toBe(
      `${KEYCLOAK_URL}/protocol/openid-connect/logout`
    );
    expect(redirectUrl.searchParams.get("client_id")).toBe(CLIENT_ID);
    expect(redirectUrl.searchParams.get("post_logout_redirect_uri")).toBe(REDIRECT_URI);
    expect(redirectUrl.searchParams.has("id_token_hint")).toBe(false);
  });

  it("revokes the session, relays set-cookie headers and adds the id_token_hint", async () => {
    const { handler, signOut } = makeDeps({
      session: { user: { id: "u1" } },
      idToken: "tok-123",
      cookies: ["a=1; Path=/", "b=2; Path=/"],
    });
    const { req, res } = makeReqRes();

    await handler(req, res, vi.fn());

    expect(signOut).toHaveBeenCalledOnce();
    expect(res.append).toHaveBeenCalledTimes(2);
    expect(res.append).toHaveBeenCalledWith("set-cookie", "a=1; Path=/");

    const redirectUrl = new URL(res.redirect.mock.calls[0][0]);
    expect(redirectUrl.searchParams.get("id_token_hint")).toBe("tok-123");
  });

  it("omits the id_token_hint when the account has no stored id token", async () => {
    const { handler } = makeDeps({ session: { user: { id: "u1" } }, idToken: null });
    const { req, res } = makeReqRes();

    await handler(req, res, vi.fn());

    const redirectUrl = new URL(res.redirect.mock.calls[0][0]);
    expect(redirectUrl.searchParams.has("id_token_hint")).toBe(false);
  });
});
