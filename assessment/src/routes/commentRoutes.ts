import { Router } from "express";
import {
  createComment,
  getCommentsForPost,
  updateComment,
  deleteComment,
} from "../controllers/commentController";

const router = Router({ mergeParams: true });

router.get("/", getCommentsForPost);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
