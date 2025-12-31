import type { NextFunction, Response, Request } from "express";
import { isValidObjectId } from "mongoose";
import User from "../models/User.js";

// Extend Express Request interface to include the userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

// Simple auth based on the user Id
// This middle ware function is called when auth is required
export const verifyLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).send("Please login");
  }
  const token = header.split(" ")[1];
  if (!token || !isValidObjectId(token)) {
    return res.status(401).send("Please provide a valid login token");
  }
  if (!(await User.exists({ _id: token }))) {
    return res.status(401).send("Invalid credentials");
  }
  req.userId = token;
  next();
};
