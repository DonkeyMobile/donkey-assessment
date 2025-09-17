import { Request, Response } from "express";
import { Post, IPost } from "../models/post.js";
import { User } from "../models/user.js";

/**
 * Create a new post
 */
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, userId } = req.body;

    // 1. Validate input
    if (!title || !userId) {
      return res.status(400).json({ message: "Title and userId are required." });
    }

    // 2. Check if the author exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Author not found." });
    }

    // 3. Create the post
    const newPost: IPost = new Post({
      title,
      content,
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
