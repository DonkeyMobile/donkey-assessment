import express from "express";
import multer from "multer";
import { createAttachment } from "../controllers/attachmentController.js";

const upload = multer({
  storage: multer.memoryStorage(), // stores file in memory as Buffer
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "application/pdf"];
    if (allowed.includes(file.mimetype)) return cb(null, true);
    return cb(new Error("Unsupported file type"));
  },
});

const router = express.Router();

// POST
router.post("/upload", upload.single("file"), createAttachment);

export default router;


