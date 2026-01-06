import multer, { MulterError, type FileFilterCallback } from "multer";
import fs from "fs";
import type { NextFunction, Request, Response } from "express";
import type { IPost } from "../models/Post.js";
import { unlink } from "fs";
import { basename, resolve } from "path";

const uploadDir = process.env.UPLOAD_DIR || "./uploads";
const maxFileSize = 50 * 1024 * 1024; // 50MB
const allowedImageTypes = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "video/mp4",
];
const allowedDocumentTypes = ["application/pdf"];
const allowedFileTypes = {
  images: allowedImageTypes,
  document: allowedDocumentTypes,
};

// Create upload directory if it does not exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export class NotAllowedFileTypeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotAllowedFileTypeError";
    Object.setPrototypeOf(this, NotAllowedFileTypeError.prototype);
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const { fieldname, mimetype } = file;
  if (
    allowedFileTypes[fieldname as keyof typeof allowedFileTypes].includes(
      mimetype
    )
  ) {
    return cb(null, true);
  }
  cb(new NotAllowedFileTypeError("Not a allowed file"));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: maxFileSize },
  fileFilter,
});

export const postUploads = upload.fields([
  { name: "document", maxCount: 1 },
  { name: "images" },
]);

export const attachmentsErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MulterError) {
    return res.status(400).send(`${err.message} on field: ${err.field}`);
  }
  if (err instanceof NotAllowedFileTypeError) {
    return res.status(400).send(`This file type is not allowed for this field`);
  }

  next(err);
};

export const deleteAttachments = (post: IPost) => {
  const removeFile = (path: string) => {
    const filename = basename(path);
    unlink(resolve(uploadDir, filename), (err) => {
      // ignoring error if the file was not found
      if (err && err.code !== "ENOENT") {
        console.error(err);
      }
    });
  };
  if (post.document) {
    removeFile(post.document.path);
  }
  if (post.images) {
    post.images.forEach(({ path }) => {
      removeFile(path);
    });
  }
};
