import express from "express";
import { getPosts, getPostsByUser, getPost, createPost, deletePost, updatePost } from "../controllers/PostController";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/:id/ByUser", getPostsByUser);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
