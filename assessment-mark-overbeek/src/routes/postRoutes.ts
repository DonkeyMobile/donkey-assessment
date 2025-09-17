import express from "express";
import { createPost } from "../controllers/postController.js";

const router = express.Router();

// POST /posts
router.post("/", createPost);

export default router;
