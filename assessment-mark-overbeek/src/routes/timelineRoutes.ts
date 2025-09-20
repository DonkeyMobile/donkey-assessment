import express from "express";
import mongoose from "mongoose";
import { createTimeline, deleteTimeline } from "../controllers/timelineController.js";

const router = express.Router();

// POST /timelines
router.post("/", createTimeline);

//validate before hitting the controller
router.param("timelineId", (req, res, next, val) => {
  if (!mongoose.Types.ObjectId.isValid(val)) {
    return res.status(400).json({ message: "Invalid timelineId format." });
  }
  next();
});
router.delete("/:timelineId", deleteTimeline);

export default router;
