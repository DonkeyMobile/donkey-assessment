import mongoose, { Document, Schema } from "mongoose";
import { IPost } from "./post.js";

export interface IAttachment extends Document {
  fileName: string;
  fileType: string;
  file: Buffer;
  postId: mongoose.Types.ObjectId | IPost;
  createdAt: Date;
}

const attachmentSchema = new mongoose.Schema({
    fileName: {type : String, required: true },
    fileType: {type: String, required: true },
    file: {
      type: Buffer,
      required: true,
      select: false, // avoid sending blob on every fetch
      validate: {
        validator: (v: Buffer) => !v || v.length <= 10 * 1024 * 1024, // 10MB
        message: "File exceeds 10MB limit"
      }
    },
      
    postId: { type : Schema.Types.ObjectId, ref: 'Post', required: true },       //reference to Post model
    createdAt: { type: Date, default: Date.now }
});

attachmentSchema.index({ postId: 1, createdAt: -1 });

export const Attachment = mongoose.model<IAttachment>("Attachment", attachmentSchema);