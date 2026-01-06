import type { NextFunction, Response, Request } from "express";
import Post from "../models/Post.js";
import { isValidObjectId } from "mongoose";
import Comment from "../models/Comment.js";
import type { ParsedQs } from "qs";
import { deleteAttachments } from "./Attachements.js";

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

interface IFileObject {
  document?: Express.Multer.File[];
  images?: Express.Multer.File[];
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

    const FILE_URL = "/uploads/";

    const files = req.files as IFileObject;
    const documentFile = files.document?.[0];
    const document = documentFile
      ? {
          fileName: documentFile.originalname,
          fileType: documentFile.mimetype,
          path: FILE_URL + documentFile.filename,
        }
      : undefined;

    const imageFiles = files.images;
    const images = imageFiles?.map((imageFile) => ({
      fileName: imageFile.originalname,
      fileType: imageFile.mimetype,
      path: FILE_URL + imageFile.filename,
    }));

    const author = req.userId;

    const post = new Post({ description, author, document, images });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { description }: IPostBody = req.body ?? {};
    const { postId } = req.params;

    if (!description) {
      return res.status(400).send("Missing fields");
    }

    const post = await Post.findById(postId, { author: true });

    if (!post) {
      return res.status(404).send("Post was not found");
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).send("You are not allowed to update this post");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { description },
      { new: true, runValidators: true }
    );
    res.status(200).json(updatedPost);
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

    const post = await Post.findById(postId, {
      author: true,
      images: true,
      document: true,
    });

    if (!post) {
      return res.status(404).send("Post was not found");
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).send("You are not allowed to delete this post");
    }

    await Post.deleteOne({ _id: postId });
    await Comment.deleteMany({ post: postId! });

    deleteAttachments(post);

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

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const defaultLimit = 20;
    const defaultPage = 0;
    const { limit, page } = req.query;
    const parsedLimit = parseParam(limit, defaultLimit);
    const parsedPage = parseParam(page, defaultPage);
    const ValidLimit = parsedLimit >= 1 && parsedLimit <= 50 ? parsedLimit : 20;
    const ValidPage = parsedPage >= 0 ? parsedPage : 0;
    const RecordsToSkip = ValidLimit * ValidPage;

    const post = await Post.find()
      .sort({ createdAt: -1 })
      .skip(RecordsToSkip)
      .limit(ValidLimit)
      .populate("author", "firstName lastName")
      .populate("commentCount");

    return res.json(post);
  } catch (error) {
    next(error);
  }
};

const parseParam = (
  value: string | any[] | ParsedQs | undefined,
  defaultValue: number
) => {
  // parse the query param to a number
  const rawValue = Array.isArray(value) ? value[0] : value;
  const parsed = parseInt(String(rawValue), 10);
  return isNaN(parsed) ? defaultValue : parsed;
};
