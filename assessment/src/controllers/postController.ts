import { Request, Response } from "express";
import path from "path";
import { Post } from "../models/Post";
import { Comment } from "../models/Comment";
import { IAttachment } from "../models/Post";
import { config } from "../config";
import { attachmentTypeFromMime } from "../utils/attachments";

export async function createPost(req: Request, res: Response): Promise<void> {
  try {
    const { date, description } = req.body;
    const files = (req.files as Express.Multer.File[]) || [];
    const attachments: IAttachment[] = [];
    for (const file of files) {
      const type = attachmentTypeFromMime(file.mimetype);
      if (!type) {
        console.warn(`Unsupported file type: ${file.mimetype} for file ${file.originalname}, skipping`);
        continue;
      }
      attachments.push({
        fileName: file.originalname,
        url: path.posix.join(config.uploadDir, file.filename),
        type,
        mimeType: file.mimetype,
      });
    }
    const post = await Post.create({ date, description, attachments });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error: (error as Error).message });
  }
}

export async function getPosts(_req: Request, res: Response): Promise<void> {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error: (error as Error).message });
  }
}

export async function getPostById(req: Request, res: Response): Promise<void> {
  try {
    const post = await Post.findById(req.params.id).populate("comments");
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch post", error: (error as Error).message });
  }
}

export async function updatePost(req: Request, res: Response): Promise<void> {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to update post", error: (error as Error).message });
  }
}

export async function deletePost(req: Request, res: Response): Promise<void> {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    await Comment.deleteMany({ post: post._id });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error: (error as Error).message });
  }
}
