import express from "express";
import mongoose from "mongoose";
import { createPost, getPost, getAllPosts, updatePost, deletePost } from "../controllers/postController.js";

const router = express.Router();

// POST /posts
router.post("/", createPost);
router.get("/:postId", getPost);
router.get("/", getAllPosts);

router.param("postId", (req, res, next, val) => {
  if (!mongoose.Types.ObjectId.isValid(val)) {
    return res.status(400).json({ message: "Invalid postId format." });
  }
  next();
});
router.patch("/:postId", updatePost);
    
router.delete("/:postId", deletePost);

export default router;
