import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "./user.js";
import { ITimeline } from "./timeline.js";
import { Comment, IComment } from "./comment.js";
import { Attachment } from "./attachment.js";

export interface IPost extends Document {
  title: string;
  content?: string;
  timelineId: mongoose.Types.ObjectId | ITimeline;
  userId: mongoose.Types.ObjectId | IUser;
  comments: IComment[];
  createdAt: Date;
}

const postSchema = new mongoose.Schema({
    title: {type : String, required: true },
    content: {type: String},
    timelineId: { type : Schema.Types.ObjectId, ref: 'Timeline', required: true },  //reference to Timeline model
    userId: { type : Schema.Types.ObjectId, ref: 'User', required: true },          //reference to User model
    comments: { type: [Comment.schema], default: [] },
    createdAt: { type: Date, default: Date.now }
});

// Cascaded delete: remove attachments when a post is deleted
postSchema.pre("findOneAndDelete", async function (next) {
  const post = await this.model.findOne(this.getFilter());
  if (post) {
    await Attachment.deleteMany({ postId: post._id });
  }
  next();
});

export const Post = mongoose.model<IPost>("Post", postSchema);