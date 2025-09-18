import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.js";

export interface IComment extends Document {
  content: string;
  userId: mongoose.Types.ObjectId | IUser;
  createdAt: Date;
}

const commentSchema = new mongoose.Schema({
  content: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Content must be at least 2 characters"],
      maxlength: [500, "Content must be under 500 characters"]},
    userId: { type : Schema.Types.ObjectId, ref: 'User', required: true },       //reference to User model
    createdAt: { type: Date, default: Date.now }
});

export const Comment = mongoose.model<IComment>("Comment", commentSchema);