import { Request, Response } from "express";
import { Post, IPost } from "../models/post.js";
import { User } from "../models/user.js";
import { Timeline } from "../models/timeline.js";

/**
 * Create a new post
 */
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, timelineId, userId } = req.body;

    // 1. Validate input
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
      return res.status(404).json({ message: "Author not found." });
    }

    // 4. Create the post
    const newPost: IPost = new Post({
      title,
      content,
      timelineId: timelineId,
      userId: userId,
      createdAt: new Date()
    });

    let savedpost = await newPost.save();

    // 4. Respond with the created post
    return res.status(201).json(savedpost);
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get posts
export const getPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update a post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;

    const updatedPost = await post.save();
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    return res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
