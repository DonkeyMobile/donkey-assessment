import express from "express";
import { createPost, getPost, getAllPosts, updatePost, deletePost } from "../controllers/postController.js";

const router = express.Router();

// POST /posts
router.post("/", createPost);
router.get("/:postId", getPost);
router.get("/", getAllPosts);
router.patch("/:postId", updatePost);
router.delete("/:postId", deletePost);


export default router;
