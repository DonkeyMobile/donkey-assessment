import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.js";

export interface IPost extends Document {
  title: string;
  content?: string;
  userId: mongoose.Types.ObjectId | IUser;
  createdAt: Date;
}

const postSchema = new mongoose.Schema({
    title: {type : String, required: true },
    content: {type: String},
    userId: { type : Schema.Types.ObjectId, ref: 'User', required: true },       //reference to User model
    createdAt: { type: Date, default: Date.now }
});

export const Post = mongoose.model<IPost>("Post", postSchema);