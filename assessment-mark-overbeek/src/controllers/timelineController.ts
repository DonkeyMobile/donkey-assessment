import { Request, Response } from "express";
import { Timeline, ITimeline } from "../models/timeline.js";

/**
 * Create a new post
 */
export const createTimeline = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;

    // 1. Validate input
    if (!description) {
      return res.status(400).json({ message: "Description is required." });
    }

    // 4. Create the timeline
    const newTimeline: ITimeline = new Timeline({
      description
    });

    let savedTimeline = await newTimeline.save();

    // 4. Respond with the created timeline
    return res.status(201).json(savedTimeline);
  } catch (error) {
    console.error("Error creating timeline:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
