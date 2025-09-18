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
    file: {type: Buffer},
    postId: { type : Schema.Types.ObjectId, ref: 'Post', required: true },       //reference to Post model
    createdAt: { type: Date, default: Date.now }
});

export const Attachment = mongoose.model<IAttachment>("Attachment", attachmentSchema);