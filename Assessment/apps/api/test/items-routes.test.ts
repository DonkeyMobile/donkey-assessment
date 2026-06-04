import { beforeEach, describe, expect, it, vi } from "vitest";
import type { RequestHandler } from "express";
import request from "supertest";
import { ApiRoutes } from "@donkey/shared";
import { makeApp } from "../src/app/index.js";
import { makeItemsReadRouter } from "../src/features/view-store/index.js";
import { makeItemsAdminRouter } from "../src/features/manage-items/index.js";
import { createRequireAdmin } from "../src/shared/middleware/index.js";
import type { InspirationItemRepository } from "../src/entities/inspiration-item/index.js";

const now = new Date("2024-01-01T00:00:00.000Z");

function makeRow(overrides: Partial<{ id: string; title: string }> = {}) {
  return {
    id: overrides.id ?? "item-1",
    type: "quote" as const,
    status: "published" as const,
    category: "Hoop",
    title: overrides.title ?? "",
    author: "Donkey Inspire",
    date: now,
    quote: "Een korte tekst",
    excerpt: null,
    body: null,
    readingTime: null,
    caption: null,
    ratio: null,
    imageUrl: null,
    createdAt: now,
    updatedAt: now,
  };
}

function fakeRepo(): InspirationItemRepository {
  return {
    listPublished: vi.fn(),
    listAll: vi.fn(),
    getById: vi.fn(),
    getPublishedById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    reset: vi.fn(),
  };
}

const allow: RequestHandler = (_req, _res, next) => next();
const validQuote = {
  type: "quote",
  quote: "Hoop doet leven",
  author: "Donkey",
  category: "Hoop",
  status: "published",
};

function buildApp(repo: InspirationItemRepository, requireAdmin: RequestHandler) {
  return makeApp({
    readRouter: makeItemsReadRouter(repo),
    adminRouter: makeItemsAdminRouter({ repo, requireAdmin }),
  });
}

describe("items routes", () => {
  let repo: InspirationItemRepository;

  beforeEach(() => {
    repo = fakeRepo();
  });

  describe("public reads", () => {
    it("GET /api/v1/items returns published items serialized", async () => {
      vi.mocked(repo.listPublished).mockResolvedValue([makeRow()]);
      const res = await request(buildApp(repo, allow)).get(ApiRoutes.items);

      expect(res.status).toBe(200);
      expect(res.body[0]).toMatchObject({ id: "item-1", type: "quote", quote: "Een korte tekst" });
      expect(repo.listPublished).toHaveBeenCalled();
    });

    it("GET /api/v1/items/:id returns 404 when missing or unpublished", async () => {
      vi.mocked(repo.getPublishedById).mockResolvedValue(null);
      const res = await request(buildApp(repo, allow)).get(ApiRoutes.item("nope"));
      expect(res.status).toBe(404);
    });
  });

  describe("admin mutations", () => {
    it("POST /api/v1/admin/items creates a valid quote (201)", async () => {
      vi.mocked(repo.create).mockResolvedValue(makeRow({ id: "new" }));
      const res = await request(buildApp(repo, allow)).post(ApiRoutes.adminItems).send(validQuote);

      expect(res.status).toBe(201);
      expect(repo.create).toHaveBeenCalledWith(
        expect.objectContaining({ type: "quote", quote: "Hoop doet leven" })
      );
    });

    it("POST rejects invalid content with 400 (zod)", async () => {
      const res = await request(buildApp(repo, allow))
        .post(ApiRoutes.adminItems)
        .send({ type: "quote", author: "x", category: "Hoop", status: "published" }); // missing quote

      expect(res.status).toBe(400);
      expect(repo.create).not.toHaveBeenCalled();
    });

    it("GET /api/v1/admin/items returns all items", async () => {
      vi.mocked(repo.listAll).mockResolvedValue([makeRow(), makeRow({ id: "item-2" })]);
      const res = await request(buildApp(repo, allow)).get(ApiRoutes.adminItems);
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
    });

    it("DELETE removes an existing item (204)", async () => {
      vi.mocked(repo.getById).mockResolvedValue(makeRow());
      vi.mocked(repo.remove).mockResolvedValue();
      const res = await request(buildApp(repo, allow)).delete(ApiRoutes.adminItem("item-1"));
      expect(res.status).toBe(204);
    });

    it("POST /reset reseeds and returns the list", async () => {
      vi.mocked(repo.reset).mockResolvedValue();
      vi.mocked(repo.listAll).mockResolvedValue([makeRow()]);
      const res = await request(buildApp(repo, allow)).post(ApiRoutes.adminReset);
      expect(res.status).toBe(200);
      expect(repo.reset).toHaveBeenCalled();
    });
  });

  describe("authorization", () => {
    it("blocks admin list with 401 when unauthenticated", async () => {
      const requireAdmin = createRequireAdmin(async () => null);
      const res = await request(buildApp(repo, requireAdmin)).get(ApiRoutes.adminItems);
      expect(res.status).toBe(401);
    });

    it("blocks admin create with 403 for a non-admin", async () => {
      const requireAdmin = createRequireAdmin(async () => ({ user: { id: "u", role: "user" } }));
      const res = await request(buildApp(repo, requireAdmin))
        .post(ApiRoutes.adminItems)
        .send(validQuote);
      expect(res.status).toBe(403);
      expect(repo.create).not.toHaveBeenCalled();
    });

    it("allows public reads without auth", async () => {
      vi.mocked(repo.listPublished).mockResolvedValue([]);
      const requireAdmin = createRequireAdmin(async () => null);
      const res = await request(buildApp(repo, requireAdmin)).get(ApiRoutes.items);
      expect(res.status).toBe(200);
    });
  });
});
