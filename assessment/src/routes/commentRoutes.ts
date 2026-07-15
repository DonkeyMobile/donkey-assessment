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
  postAndCommentIdParamSchema,
  createCommentSchema,
  updateCommentSchema,
} from "../validation/commentValidation";

const router = Router({ mergeParams: true });

router.get("/", validate({ params: postIdParamSchema }), getCommentsForPost);
router.post("/", validate({ params: postIdParamSchema, body: createCommentSchema }), createComment);
router.put("/:id", validate({ params: postAndCommentIdParamSchema, body: updateCommentSchema }), updateComment);
router.delete("/:id", validate({ params: postAndCommentIdParamSchema }), deleteComment);

export default router;
