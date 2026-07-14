import { Request, Response } from "express";
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";

export async function createComment(req: Request, res: Response): Promise<void> {
  try {
    const { postId } = req.params;
    const { description, author } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    const comment = await Comment.create({ post: postId, description, author });
    post.comments.push(comment._id);
    await post.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create comment", error: (error as Error).message });
  }
}

export async function getCommentsForPost(req: Request, res: Response): Promise<void> {
  try {
    const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: 1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error: (error as Error).message });
  }
}

export async function updateComment(req: Request, res: Response): Promise<void> {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update comment", error: (error as Error).message });
  }
}

export async function deleteComment(req: Request, res: Response): Promise<void> {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete comment", error: (error as Error).message });
  }
}
