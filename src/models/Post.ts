import { Schema, Types, model } from "mongoose";
import { type IUser } from "./User.js";
import type { IAttachment } from "./Attachment.js";
import attachmentSchema from "./Attachment.js";

interface IPost {
  description: string;
  author: Types.ObjectId | IUser;
  images?: IAttachment[];
  document?: IAttachment;
  commentCount?: number;
}

const postSchema = new Schema<IPost>(
  {
    description: {
      type: String,
      required: true,
      maxlength: [500, "Post cannot exceed 500 characters"],
    },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    images: [attachmentSchema],
    document: attachmentSchema,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

postSchema.virtual("commentCount", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
  count: true,
});

const Post = model<IPost>("Post", postSchema);

export default Post;
export type { IPost };
