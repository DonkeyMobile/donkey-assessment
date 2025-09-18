import { Request, Response } from "express";
import { Comment, IComment } from "../models/comment.js";
import { Post, IPost } from "../models/post.js";
import { User } from "../models/user.js";

/**
 * Create a new post
 */
export const createComment = async (req: Request, res: Response) => {
  try {
    const { content, postId, userId } = req.body;

    // 1. Validate input
    if (!content || !postId || !userId) {
      return res.status(400).json({ message: "Content, postId and userId are required." });
    }

    // 2. Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // 3. Check if the author exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Author not found." });
    }

    // 4. Create the comment
    const newComment: IComment = new Comment({
      content,
      postId: postId,
      userId: userId,
      createdAt: new Date()
    });

    let savedComment = await newComment.save();

    // 4. Respond with the created comment
    return res.status(201).json(savedComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
