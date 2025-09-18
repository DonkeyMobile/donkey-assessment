import express from "express";
import { createComment } from "../controllers/commentController.js";

const router = express.Router();

// POST /posts
router.post("/", createComment);

export default router;
