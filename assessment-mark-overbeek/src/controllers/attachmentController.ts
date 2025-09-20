import mongoose from "mongoose";
import { Request, Response } from "express";
import { Attachment }from "../models/attachment.js";
import { Post } from "../models/post.js";

export const createAttachment = async (req: Request, res: Response) => {
  try {
    const file = (req as Request & { file?: Express.Multer.File }).file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    const safeName = file.originalname.replace(/[^\w.\-]+/g, "_");

    const { postId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid postId format." });
    }
    
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const newAttachment = new Attachment({
      fileName: safeName,
      fileType: file.mimetype,
      file: file.buffer,
      postId: postId
    });

    try {
      await newAttachment.save();
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }

    return res.status(201).json({ id: newAttachment._id, filename: newAttachment.fileName });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload attachment."} );
  }
};
