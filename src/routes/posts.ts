import { Router } from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
  verifyPostId,
} from "../controllers/Post.js";
import { commentRouter } from "./comments.js";
import { verifyLogin } from "../controllers/Auth.js";
import {
  attachmentsErrorHandler,
  postUploads,
} from "../controllers/Attachements.js";

const router = Router();

router.post("/", verifyLogin, postUploads, createPost, attachmentsErrorHandler);
router.delete("/:postId", verifyLogin, deletePost);
router.patch("/:postId", verifyLogin, updatePost);
router.get("/", getPosts);
router.get("/:postId", getPost);

router.use("/:postId/comments", commentRouter);

// Verify post id's
router.param("postId", verifyPostId);

export { router as postRouter };
