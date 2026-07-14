import { z } from "zod";

export const objectIdParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id format"),
});

export const createPostSchema = z.object({
  date: z.coerce.date(),
  description: z.string().trim().min(1, "description is required"),
});

export const updatePostSchema = z
  .object({
    date: z.coerce.date().optional(),
    description: z.string().trim().min(1).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
