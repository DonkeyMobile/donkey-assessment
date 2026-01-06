import { Router } from "express";
import {
  createComment,
  deleteComment,
  getCommentsByPost,
  verifyCommentId,
} from "../controllers/Comment.js";
import { verifyLogin } from "../controllers/Auth.js";

const router = Router({ mergeParams: true });

router.get("/", getCommentsByPost);
router.post("/", verifyLogin, createComment);
router.delete("/:commentId", verifyLogin, deleteComment);

// Verify comment id's
router.param("commentId", verifyCommentId);

export { router as commentRouter };
