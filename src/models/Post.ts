import { Schema, Types, model } from "mongoose";
import { type IUser } from "./User.js";

interface IPost {
  description: string;
  author: Types.ObjectId | IUser;
}

const postSchema = new Schema<IPost>(
  {
    description: {
      type: String,
      required: true,
      maxlength: [500, "Post cannot exceed 500 characters"],
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Post = model<IPost>("Post", postSchema);

export default Post;
export type { IPost };
