import { Post } from "../models/post.js";
import { User } from "../models/user.js";
import { Timeline } from "../models/timeline.js";
/**
 * Create a new post
 */
export const createPost = async (req, res) => {
    try {
        const { title, content, timelineId, userId, comments = [] } = req.body;
        // Validate required fields
        if (!title || !timelineId || !userId) {
            return res.status(400).json({ message: "Title, timelineId and userId are required." });
        }
        // 2. Check if the timeline exists
        const timeline = await Timeline.findById(timelineId);
        if (!timeline) {
            return res.status(404).json({ message: "Timeline not found." });
        }
        // 3. Check if the author exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "AuthuserId not found." });
        }
        // Optional: validate embedded
        if (!Array.isArray(comments)) {
            return res.status(400).json({ message: "Comments must be arrays." });
        }
        // Create post with embedded data
        const newPost = new Post({
            title,
            content,
            timelineId,
            userId,
            comments,
            createdAt: new Date()
        });
        const savedPost = await newPost.save();
        return res.status(201).json(savedPost);
    }
    catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// Get posts
export const getPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        return res.status(200).json(post);
    }
    catch (error) {
        console.error("Error fetching post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.status(200).json(posts);
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
// Update a post
export const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content, comments } = req.body;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        // Update scalar fields
        if (title !== undefined)
            post.title = title;
        if (content !== undefined)
            post.content = content;
        // Replace embedded arrays if provided
        if (Array.isArray(comments)) {
            post.comments = comments;
        }
        const updatedPost = await post.save();
        return res.status(200).json(updatedPost);
    }
    catch (error) {
        console.error("Error updating post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        return res.status(200).json({ message: "Post deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
