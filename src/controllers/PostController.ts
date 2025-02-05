import { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/Post";

// Returns all posts
export const getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Post.find().populate("user", "name email");
        if (!posts || posts.length === 0) {
            res.status(404).json({ error: "No posts found" });
            return;
        }
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

// Returns a specific post by post id
export const getPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findById(req.params.id).populate("user", "name email");
        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

// Returns all posts by a specific user
export const getPostsByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Post.find({ user: req.params.id }).populate("user", "name email");

        if (!posts || posts.length === 0) {
            res.status(404).json({ error: "No posts found for this user" });
            return;
        }

        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Create a single post
export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { description, user } = req.body;
        if (!description || !user) {
            res.status(400).json({ error: "Description and user ID are required" });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(user)) {
            res.status(400).json({ error: "Invalid user ID format" });
            return;
        }

        const post = new Post({
            date: new Date(), // Automatically set the date
            description,
            user
        });

        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

// Deletes a post by post id
export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }

        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

// Updates a post by post id
export const updatePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { description } = req.body;
        if (!description) {
            res.status(400).json({ error: "Description is required for update" });
            return;
        }

        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { description },
            { new: true, runValidators: true }
        );

        if (!post) {
            res.status(404).json({ error: "Post not found" });
            return;
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
