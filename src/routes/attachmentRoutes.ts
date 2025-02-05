import express from "express";
import { getAttachmentsByPost, getAttachment, createAttachment, updateAttachment, deleteAttachment } from "../controllers/AttachmentController";

const router = express.Router();

router.get("/:id/ByPost", getAttachmentsByPost); // Id references a specific post
router.get("/:id", getAttachment); // Id references a specific attachment

router.post("/", createAttachment); // Attachments are tied to a post
router.put("/:id", updateAttachment); // Update an attachment
router.delete("/:id", deleteAttachment); // Delete an attachment

export default router;
