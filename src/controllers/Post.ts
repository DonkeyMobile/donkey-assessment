import type { NextFunction, Response, Request } from "express";
import Post from "../models/Post.js";
import { isValidObjectId } from "mongoose";
import Comment from "../models/Comment.js";

export const verifyPostId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  value: string
) => {
  if (value && !isValidObjectId(value)) {
    return res.status(400).send("Invalid Id");
  }
  if (!(await Post.exists({ _id: value }))) {
    return res.status(404).send("Post was not found");
  }
  next();
};

interface IPostBody {
  description: string;
}

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { description }: IPostBody = req.body ?? {};

    if (!description) {
      return res.status(400).send("Missing fields");
    }

    const author = req.userId;

    const post = new Post({ description, author });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    await Post.deleteOne({ _id: postId });
    await Comment.deleteMany({ post: postId! });

    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate("author", "firstName lastName")
      .populate("commentCount");

    if (!post) {
      return res.status(404).send("Post was not found");
    }

    return res.json(post);
  } catch (error) {
    next(error);
  }
};
