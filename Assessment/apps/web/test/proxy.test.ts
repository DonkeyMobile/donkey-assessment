import { beforeEach, describe, expect, it, vi } from "vitest";

const { redirectMock, nextMock } = vi.hoisted(() => ({
  redirectMock: vi.fn((url: URL) => ({ kind: "redirect", url })),
  nextMock: vi.fn(() => ({ kind: "next" })),
}));

vi.mock("next/server", () => ({
  NextResponse: { redirect: redirectMock, next: nextMock },
}));

import { proxy } from "@/proxy";

function makeRequest(cookieNames: string[]) {
  return {
    cookies: { getAll: () => cookieNames.map((name) => ({ name, value: "x" })) },
    nextUrl: { clone: () => new URL("https://app.test/admin/foo") },
  } as unknown as Parameters<typeof proxy>[0];
}

describe("admin proxy", () => {
  beforeEach(() => {
    redirectMock.mockClear();
    nextMock.mockClear();
  });

  it("redirects to the home page when no session cookie is present", () => {
    proxy(makeRequest(["some-other-cookie"]));

    expect(nextMock).not.toHaveBeenCalled();
    expect(redirectMock).toHaveBeenCalledTimes(1);
    expect(redirectMock.mock.calls[0][0].pathname).toBe("/");
  });

  it("lets the request through when a better-auth session cookie is present", () => {
    proxy(makeRequest(["better-auth.session_token"]));

    expect(redirectMock).not.toHaveBeenCalled();
    expect(nextMock).toHaveBeenCalledTimes(1);
  });

  it("matches the secure-prefixed production cookie name", () => {
    proxy(makeRequest(["__Secure-better-auth.session_token"]));

    expect(nextMock).toHaveBeenCalledTimes(1);
    expect(redirectMock).not.toHaveBeenCalled();
  });
});
