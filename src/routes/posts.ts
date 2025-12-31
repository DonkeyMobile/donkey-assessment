import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  verifyPostId,
} from "../controllers/Post.js";
import { commendRouter } from "./comments.js";
import { verifyLogin } from "../controllers/Auth.js";

const router = Router();

router.post("/", verifyLogin, createPost);
router.delete("/:postId", verifyLogin, deletePost);
router.get("/:postId", getPost);

router.use("/:postId/comments", commendRouter);

// Verify post id's
router.param("postId", verifyPostId);

export { router as postRouter };
