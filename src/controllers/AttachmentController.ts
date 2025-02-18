import { Request, Response } from "express";
import mongoose from "mongoose";
import Attachment from "../models/Attachment";

// Get all attachments for a specific post
export const getAttachmentsByPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const attachments = await Attachment.find({ post: req.params.id });

        if (!attachments || attachments.length === 0) {
            res.status(404).json({ error: "No attachments found for this post" });
            return;
        }

        res.json(attachments);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Get a specific attachment by ID
export const getAttachment = async (req: Request, res: Response): Promise<void> => {
    try {
        const attachment = await Attachment.findById(req.params.id);

        if (!attachment) {
            res.status(404).json({ error: "Attachment not found" });
            return;
        }

        res.json(attachment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Create a new attachment for a post
export const createAttachment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { type, filePath, post } = req.body;

        if (!type || !filePath || !post) {
            res.status(400).json({ error: "Type, filePath, and post ID are required" });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(post)) {
            res.status(400).json({ error: "Invalid post ID format" });
            return;
        }

        const attachment = new Attachment({
            type,
            filePath,
            post
        });

        await attachment.save();
        res.status(201).json(attachment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Update an attachment (optional)
export const updateAttachment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { type, filePath } = req.body;

        if (!type && !filePath) {
            res.status(400).json({ error: "At least one field (type or filePath) is required for update" });
            return;
        }

        const attachment = await Attachment.findByIdAndUpdate(
            req.params.id,
            { type, filePath },
            { new: true, runValidators: true }
        );

        if (!attachment) {
            res.status(404).json({ error: "Attachment not found" });
            return;
        }

        res.json(attachment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Delete an attachment by ID
export const deleteAttachment = async (req: Request, res: Response): Promise<void> => {
    try {
        const attachment = await Attachment.findByIdAndDelete(req.params.id);

        if (!attachment) {
            res.status(404).json({ error: "Attachment not found" });
            return;
        }

        res.json({ message: "Attachment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
