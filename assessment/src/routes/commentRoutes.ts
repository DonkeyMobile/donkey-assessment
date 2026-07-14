import { Router } from "express";
import {
  createComment,
  getCommentsForPost,
  updateComment,
  deleteComment,
} from "../controllers/commentController";
import { validate } from "../middleware/validate";
import {
  postIdParamSchema,
  commentIdParamSchema,
  createCommentSchema,
  updateCommentSchema,
} from "../validation/commentValidation";

const router = Router({ mergeParams: true });

router.get("/", validate({ params: postIdParamSchema }), getCommentsForPost);
router.post("/", validate({ params: postIdParamSchema, body: createCommentSchema }), createComment);
router.put("/:id", validate({ params: commentIdParamSchema, body: updateCommentSchema }), updateComment);
router.delete("/:id", validate({ params: commentIdParamSchema }), deleteComment);

export default router;
