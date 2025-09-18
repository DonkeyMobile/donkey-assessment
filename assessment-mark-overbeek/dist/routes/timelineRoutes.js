import express from "express";
import { createTimeline } from "../controllers/timelineController.js";
const router = express.Router();
// POST /posts
router.post("/", createTimeline);
export default router;
