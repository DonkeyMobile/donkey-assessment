import { Router } from "express";
import multer from "multer";
import path from "path";
import { config } from "../config";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController";
import commentRoutes from "./commentRoutes";
import { AttachmentType, IAttachment, Post } from "../models/Post";
import sanitize from "sanitize-filename";

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, config.uploadDir),
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${sanitize(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

function attachmentTypeFromMime(mimeType: string): AttachmentType | null {
  if (mimeType.startsWith("image/")) return AttachmentType.PHOTO;
  if (mimeType.startsWith("video/")) return AttachmentType.VIDEO;
  if (mimeType === "application/pdf") return AttachmentType.PDF;
  return null;
}

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

router.post("/:id/attachments", upload.array("files"), async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }
    const files = (req.files as Express.Multer.File[]) || [];
    const attachments: IAttachment[] = [];
    for (const file of files) {
      const type = attachmentTypeFromMime(file.mimetype);
      if (!type) continue;
      attachments.push({
        fileName: file.originalname,
        url: path.join(config.uploadDir, file.filename),
        type,
        mimeType: file.mimetype,
      });
    }
    post.attachments.push(...attachments);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Failed to upload attachments", error: (error as Error).message });
  }
});

router.use("/:postId/comments", commentRoutes);

export default router;
