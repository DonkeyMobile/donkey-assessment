import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.js";
import { IPost } from "./post.js";

export interface IComment extends Document {
  content: string;
  postId: mongoose.Types.ObjectId | IPost;
  userId: mongoose.Types.ObjectId | IUser;
  createdAt: Date;
}

const commentSchema = new mongoose.Schema({
    content: {type: String, required: true },
    postId: { type : Schema.Types.ObjectId, ref: 'Post', required: true },       //reference to Post model
    userId: { type : Schema.Types.ObjectId, ref: 'User', required: true },       //reference to User model
    createdAt: { type: Date, default: Date.now }
});

export const Comment = mongoose.model<IComment>("Comment", commentSchema);