import express from "express";
import type { Request, Response, NextFunction } from "express";
import { Error, isValidObjectId } from "mongoose";

import { apiRouter } from "./routes/api.js";

// Configure express
const app = express();
app.use(express.json());

// Routes
app.use("/api", apiRouter);

// Handling errors globally
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error.ValidationError) {
    return res.status(400).send(err.message);
  }
  next(err);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

export default app;
