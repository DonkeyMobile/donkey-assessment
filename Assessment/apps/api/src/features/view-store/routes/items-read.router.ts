import { Router } from "express";
import {
  serializeInspirationItem,
  type InspirationItemRepository,
} from "../../../entities/inspiration-item/index.js";

/** Public read routes — published content only (no auth). */
export function makeItemsReadRouter(repo: InspirationItemRepository): Router {
  const router = Router();

  router.get("/", async (_req, res, next) => {
    try {
      const items = await repo.listPublished();
      res.json(items.map(serializeInspirationItem));
    } catch (err) {
      next(err);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const item = await repo.getPublishedById(req.params.id);
      if (!item) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(serializeInspirationItem(item));
    } catch (err) {
      next(err);
    }
  });

  return router;
}
