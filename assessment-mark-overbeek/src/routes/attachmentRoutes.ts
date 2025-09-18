import express from "express";
import { createAttachment } from "../controllers/attachmentController.js";

const router = express.Router();

// POST
router.post("/", createAttachment);

export default router;
