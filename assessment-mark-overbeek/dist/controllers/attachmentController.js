import mongoose from "mongoose";
import { Attachment } from "../models/attachment.js";
import { Post } from "../models/post.js";
export const createAttachment = async (req, res) => {
    try {
        const file = req.file;
        const { postId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid postId format." });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        const newAttachment = new Attachment({
            fileName: file.originalname,
            fileType: file.mimetype,
            file: file.buffer,
            postId: postId
        });
        res.status(201).json({ id: newAttachment._id, filename: newAttachment.fileName });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "Failed to upload attachment." });
    }
};
