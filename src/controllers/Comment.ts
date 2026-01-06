import type { NextFunction, Response, Request } from "express";
import { isValidObjectId } from "mongoose";
import Comment from "../models/Comment.js";

export const verifyCommentId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  value: string
) => {
  try {
    if (value && !isValidObjectId(value)) {
      return res.status(400).send("Invalid Id");
    }
    if (!(await Comment.exists({ _id: value }))) {
      return res.status(404).send("Comment was not found");
    }
    next();
  } catch (error) {
    next(error);
  }
};

interface ICommentBody {
  comment: string;
}

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { comment }: ICommentBody = req.body ?? {};

    if (!comment) {
      return res.status(400).send("Missing fields");
    }

    const { postId } = req.params;
    const author = req.userId;

    const newComment = new Comment({ comment, author, post: postId });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId, { author: true });

    if (!comment) {
      return res.status(404).send("Comment was not found");
    }

    if (comment.author.toString() !== req.userId) {
      return res.status(403).send("You are not allowed to delete this comment");
    }

    await Comment.deleteOne({ _id: commentId });

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const getCommentsByPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId! })
      .populate("author", "firstName lastName")
      .sort({ createdAt: -1 });

    return res.json(comments);
  } catch (error) {
    next(error);
  }
};
