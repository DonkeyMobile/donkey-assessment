import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.js";
import { ITimeline } from "./timeline.js";

export interface IPost extends Document {
  title: string;
  content?: string;
  timelineId: mongoose.Types.ObjectId | ITimeline;
  userId: mongoose.Types.ObjectId | IUser;
  createdAt: Date;
}

const postSchema = new mongoose.Schema({
    title: {type : String, required: true },
    content: {type: String},
    timelineId: { type : Schema.Types.ObjectId, ref: 'Timeline', required: true },  //reference to Timeline model
    userId: { type : Schema.Types.ObjectId, ref: 'User', required: true },          //reference to User model
    createdAt: { type: Date, default: Date.now }
});

export const Post = mongoose.model<IPost>("Post", postSchema);