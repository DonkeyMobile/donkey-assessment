import { Request, Response } from "express";
import mongoose from "mongoose";
import Comment from "../models/Comment";

// Get all comments for a specific post
export const getCommentsByPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const comments = await Comment.find({ post: req.params.id })
            .populate("user", "name email")
            .populate("post", "description");
        
        if (!comments || comments.length === 0) {
            res.status(404).json({ error: "No comments found for this post" });
            return;
        }

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

// Get all comments made by a specific user
export const getCommentsByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const comments = await Comment.find({ user: req.params.id })
            .populate("user", "name email")
            .populate("post", "description");
        
        if (!comments || comments.length === 0) {
            res.status(404).json({ error: "No comments found for this user" });
            return;
        }

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

// Get a specific comment by ID
export const getComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const comment = await Comment.findById(req.params.id)
            .populate("user", "name email")
            .populate("post", "description");
        
        if (!comment) {
            res.status(404).json({ error: "Comment not found" });
            return;
        }

        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

// Create a new comment
export const createComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { text, user, post } = req.body;
        if (!text || !user || !post) {
            res.status(400).json({ error: "Text, user ID, and post ID are required" });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(post)) {
            res.status(400).json({ error: "Invalid user or post ID format" });
            return;
        }

        const comment = new Comment({
            text,
            user,
            post,
            createdAt: new Date() // Automatically set the creation date
        });

        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

// Update a comment by ID
export const updateComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { text } = req.body;
        if (!text) {
            res.status(400).json({ error: "Text is required for update" });
            return;
        }

        const comment = await Comment.findByIdAndUpdate(
            req.params.id,
            { text },
            { new: true, runValidators: true }
        );

        if (!comment) {
            res.status(404).json({ error: "Comment not found" });
            return;
        }

        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

// Delete a comment by ID
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            res.status(404).json({ error: "Comment not found" });
            return;
        }

        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
