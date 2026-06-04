import { describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";
import { createRequireAdmin, type GuardSession } from "../src/shared/middleware/index.js";

function mockRes() {
  const res = {} as Response & { statusCode?: number; body?: unknown };
  res.status = vi.fn().mockImplementation((code: number) => {
    res.statusCode = code;
    return res;
  });
  res.json = vi.fn().mockImplementation((body: unknown) => {
    res.body = body;
    return res;
  });
  return res;
}

const req = { headers: {} } as Request;

describe("createRequireAdmin", () => {
  it("returns 401 when there is no session", async () => {
    const guard = createRequireAdmin(async () => null);
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    await guard(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 403 when the user is not an admin", async () => {
    const session: GuardSession = { user: { id: "user-1", role: "user" } };
    const guard = createRequireAdmin(async () => session);
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    await guard(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next() when the user is an admin", async () => {
    const session: GuardSession = { user: { id: "user-1", role: "admin" } };
    const guard = createRequireAdmin(async () => session);
    const res = mockRes();
    const next = vi.fn() as unknown as NextFunction;

    await guard(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });
});
