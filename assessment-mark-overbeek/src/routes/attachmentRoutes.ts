import express from "express";
import multer from "multer";
import { createAttachment } from "../controllers/attachmentController.js";

const upload = multer({ storage: multer.memoryStorage() }); // stores file in memory as Buffer

const router = express.Router();

// POST
router.post("/upload", upload.single("file"), createAttachment);

export default router;


