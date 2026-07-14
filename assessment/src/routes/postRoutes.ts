import { Router } from "express";
import multer from "multer";
import { config } from "../config";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from "../controllers/postController";
import commentRoutes from "./commentRoutes";
import sanitize from "sanitize-filename";
import { validate } from "../middleware/validate";
import { createPostSchema, updatePostSchema, objectIdParamSchema } from "../validation/postValidation";

const router = Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, config.uploadDir),
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${sanitize(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024, files: 10 },
});

router.get("/", getPosts);
router.get("/:id", validate({ params: objectIdParamSchema }), getPostById);
router.post("/", upload.array("files"), validate({ body: createPostSchema }), createPost);
router.put("/:id", validate({ params: objectIdParamSchema, body: updatePostSchema }), updatePost);
router.delete("/:id", validate({ params: objectIdParamSchema }), deletePost);

router.use("/:postId/comments", commentRoutes);

export default router;
