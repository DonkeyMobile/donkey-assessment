import express, { Router, Request, Response } from "express";
import multer from "multer";
import * as PostService from "../services/post.service";

const router: Router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", async (req, res, next) => {
  try {
    const allPosts = await PostService.getAll();
    res.status(200).json(allPosts);
  } catch (error: any) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const post = await PostService.getWithId(id);
    res.status(200).json(post);
  } catch (error: any) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { title, author, content } = req.body;

  try {
    const newPost = await PostService.create(title, author, content);
    res.status(201).json(newPost);
  } catch (error: any) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  const { title, content } = req.body;

  try {
    const updatedPost = await PostService.updateWithId(id, title, content);
    res.status(200).json({
      Message: "Successfully updated post",
      Post: updatedPost,
    });
  } catch (error: any) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletedPost = await PostService.deleteWithId(id);
    res.status(200).json({
      Message: "Successfully deleted post",
      Post: deletedPost,
    });
  } catch (error: any) {
    next(error);
  }
});

router.post("/:id/comment", async (req, res, next) => {
  const id = req.params.id;
  const { author, comment } = req.body;

  console.log(author);
  try {
    const updatedPost = await PostService.addComment(id, author, comment);
    res.status(200).json({
      Message: "Successfully added comment to post",
      Post: updatedPost,
    });
  } catch (error: any) {
    next(error);
  }
});

router.post(
  "/:id/attachment",
  upload.single("file"),
  async (req, res, next) => {
    const id = req.params.id;

    const filePath = req.file?.path;
    const fileName = req.file?.filename;
    const mimeType = req.file?.mimetype;

    try {
      if (filePath && fileName && mimeType) {
        const updatedPost = await PostService.addAttachment(
          id,
          fileName,
          mimeType,
          filePath
        );
        res.status(200).json({
          Message: "Successfully added comment to post",
          Post: updatedPost,
        });
      } else {
        throw new Error(
          "There wen't something wrong with converting the file to string path."
        );
      }
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;
