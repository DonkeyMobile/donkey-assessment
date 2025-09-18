import { Attachment } from "../models/attachment.js";
import { Post } from "../models/post.js";
/**
 * Create a new attachment
 */
export const createAttachment = async (req, res) => {
    try {
        const { fileName, fileType, file, postId } = req.body;
        // 1. Validate input
        if (!fileName || !fileType || !postId) {
            return res.status(400).json({ message: "Filename, filetype and postId are required." });
        }
        // 2. Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        // 3. Create the attachment
        const newAttachment = new Attachment({
            fileName,
            fileType,
            file,
            postId: postId,
            createdAt: new Date()
        });
        let savedAttachment = await newAttachment.save();
        // 4. Respond with the created attachment
        return res.status(201).json(savedAttachment);
    }
    catch (error) {
        console.error("Error creating attachment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
