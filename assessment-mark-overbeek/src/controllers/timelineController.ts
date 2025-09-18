import { Request, Response } from "express";
import { Timeline, ITimeline } from "../models/timeline.js";

/**
 * Create a new post
 */
export const createTimeline = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;

    // Create the timeline
    const newTimeline: ITimeline = new Timeline({
      description
    });

    // force schema validation
    try {
        await newTimeline.save();
    }catch (err: any) {
        return res.status(400).json({error: err.message, err});
    }

    // Respond with the created timeline
    return res.status(201).json(newTimeline);
  } catch (error) {
    console.error("Error creating timeline:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Delete a timeline by ID
 */
export const deleteTimeline = async (req: Request, res: Response) => {
  try {
    const { timelineId } = req.params;

    if (!timelineId) {
      return res.status(400).json({ message: "Timeline ID is required." });
    }

    const deletedTimeline = await Timeline.findByIdAndDelete(timelineId);
    if (!deletedTimeline) {
      return res.status(404).json({ message: "Timeline not found." });
    }

    return res.status(200).json({ message: "Timeline deleted successfully." });
  } catch (error) {
    console.error("Error deleting timeline:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};