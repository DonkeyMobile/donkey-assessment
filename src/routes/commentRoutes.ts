import express from "express";
import { getCommentsByPost, getCommentsByUser, getComment, createComment, updateComment, deleteComment } from "../controllers/CommentController";

const router = express.Router();

router.get("/:id/ByPost", getCommentsByPost);
router.get("/:id/ByUser", getCommentsByUser);
router.get("/:id", getComment);

router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
