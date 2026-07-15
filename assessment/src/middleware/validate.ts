import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { deleteUploadedFile, deleteUploadedFiles } from "../utils/attachments";

interface ValidationSchemas {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

export function validate(schemas: ValidationSchemas) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      if (schemas.params) {
        const parsed = schemas.params.parse(req.params) as Record<string, unknown>;
        req.params = { ...req.params, ...parsed } as typeof req.params;
      }
      if (schemas.query) {
        const parsed = schemas.query.parse(req.query) as Record<string, unknown>;
        req.query = { ...req.query, ...parsed } as typeof req.query;
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        if (req.files) {
          deleteUploadedFiles(req.files as Express.Multer.File[]);
        } else if (req.file) {
          deleteUploadedFile(req.file.path);
        }
        res.status(400).json({
          message: "Validation failed",
          errors: error.issues.map((e) => ({ path: e.path.join("."), message: e.message })),
        });
        return;
      }
      next(error);
    }
  };
}
