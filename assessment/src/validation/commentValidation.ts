import { z } from "zod";

export const postIdParamSchema = z.object({
  postId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid postId format"),
});

export const commentIdParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id format"),
});

export const createCommentSchema = z.object({
  description: z.string().trim().min(1, "description is required"),
  author: z.string().trim().min(1, "author is required"),
});

export const updateCommentSchema = z
  .object({
    description: z.string().trim().min(1).optional(),
    author: z.string().trim().min(1).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
