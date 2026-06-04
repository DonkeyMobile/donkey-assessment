import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { headersMock } = vi.hoisted(() => ({ headersMock: vi.fn() }));
vi.mock("next/headers", () => ({ headers: headersMock }));

import { getServerSession } from "@/entities/session";

function withCookie(cookie: string | null) {
  headersMock.mockResolvedValue({ get: (key: string) => (key === "cookie" ? cookie : null) });
}

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getServerSession", () => {
  it("returns null and does not call the API when there is no cookie", async () => {
    withCookie(null);
    expect(await getServerSession()).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns null when the API responds with a non-ok status", async () => {
    withCookie("better-auth.session=abc");
    fetchMock.mockResolvedValue({ ok: false });
    expect(await getServerSession()).toBeNull();
  });

  it("returns null when the API responds ok but without a user", async () => {
    withCookie("better-auth.session=abc");
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({}) });
    expect(await getServerSession()).toBeNull();
  });

  it("returns the session when the API responds with a user", async () => {
    withCookie("better-auth.session=abc");
    const user = { id: "u1", email: "a@b.nl", role: "admin" };
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ user }) });

    expect(await getServerSession()).toEqual({ user });
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/auth/get-session"),
      expect.objectContaining({ headers: { cookie: "better-auth.session=abc" } })
    );
  });
});
