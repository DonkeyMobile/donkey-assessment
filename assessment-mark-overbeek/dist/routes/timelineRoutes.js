import express from "express";
import { createTimeline, deleteTimeline } from "../controllers/timelineController.js";
const router = express.Router();
// POST /posts
router.post("/", createTimeline);
router.delete("/:timelineId", deleteTimeline);
export default router;
