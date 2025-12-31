import { Schema, Types, model } from "mongoose";
import type { IUser } from "./User.js";
import type { IPost } from "./Post.js";

interface IComment {
  comment: string;
  post: Types.ObjectId | IPost;
  author: Types.ObjectId | IUser;
}

const commentSchema = new Schema<IComment>(
  {
    comment: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  },
  { timestamps: true }
);

const Comment = model<IComment>("Comment", commentSchema);

export default Comment;
export type { IComment };
