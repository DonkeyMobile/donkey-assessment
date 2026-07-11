import { Schema, model, Document, Types } from "mongoose";

export interface IComment extends Document {
  post: Types.ObjectId;
  description: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    description: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Comment = model<IComment>("Comment", commentSchema);
