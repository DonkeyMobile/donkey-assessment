import mongoose from "mongoose";
import { Request, Response } from "express";
import { Attachment }from "../models/attachment.js";
import { Post } from "../models/post.js";

export const createAttachment = async (req: Request, res: Response) => {
  try {
    const file = (req as Request & { file: Express.Multer.File }).file;
    const { postId } = req.body;

    if (!postId) {
      return res.status(400).json({ message: "postId is required." });
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid postId format." });
    }
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const attachment = new Attachment({
      fileName: file.originalname,
      fileType: file.mimetype,
      file: file.buffer,
      postId: postId
    });

    const savedAttachment = await attachment.save();
    res.status(201).json({ id: savedAttachment._id, filename: savedAttachment.fileName });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Failed to upload attachment." });
  }
};
