import express from "express";
import PostController from './controllers/post.controller';
import CommentController from "./controllers/comment.controller";
import AttachmentController from "./controllers/attachment.controller";

const router = express.Router();

router.get('/posts', PostController.getList);
router.get('/posts/:id', PostController.getPost);
router.post('/posts', PostController.createPost);
router.put('/posts/:id', PostController.updatePost);
router.delete('/posts/:id', PostController.deletePost);

router.post('/posts/:postid/comments', CommentController.createComment);
router.put('/posts/:postid/comments/:commentid', CommentController.updateComment);
router.delete('/posts/:postid/comments/:commentid', CommentController.deleteComment);

router.post('/posts/:postid/attachments', AttachmentController.uploadAttachment);

export {router}