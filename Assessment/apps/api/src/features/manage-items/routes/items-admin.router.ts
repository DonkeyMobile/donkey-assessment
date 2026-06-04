import { Router, type RequestHandler } from "express";
import { contentInputSchema } from "@donkey/shared";
import {
  serializeInspirationItem,
  type InspirationItemRepository,
} from "../../../entities/inspiration-item/index.js";

interface Deps {
  repo: InspirationItemRepository;
  /** Admin guard, injected by the app layer (keeps the auth feature decoupled). */
  requireAdmin: RequestHandler;
}

/** Admin-only routes: full list, create, update, delete, reset. */
export function makeItemsAdminRouter({ repo, requireAdmin }: Deps): Router {
  const router = Router();

  // Every admin route requires the admin role.
  router.use(requireAdmin);

  router.get("/", async (_req, res, next) => {
    try {
      const items = await repo.listAll();
      res.json(items.map(serializeInspirationItem));
    } catch (err) {
      next(err);
    }
  });

  router.post("/reset", async (_req, res, next) => {
    try {
      await repo.reset();
      const items = await repo.listAll();
      res.json(items.map(serializeInspirationItem));
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const parsed = contentInputSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: "validation", issues: parsed.error.flatten() });
        return;
      }
      const item = await repo.create(parsed.data);
      res.status(201).json(serializeInspirationItem(item));
    } catch (err) {
      next(err);
    }
  });

  router.put("/:id", async (req, res, next) => {
    try {
      const parsed = contentInputSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ error: "validation", issues: parsed.error.flatten() });
        return;
      }
      const existing = await repo.getById(req.params.id);
      if (!existing) {
        res.status(404).json({ error: "not found" });
        return;
      }
      const item = await repo.update(req.params.id, parsed.data);
      res.json(serializeInspirationItem(item));
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const existing = await repo.getById(req.params.id);
      if (!existing) {
        res.status(404).json({ error: "not found" });
        return;
      }
      await repo.remove(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  });

  return router;
}
