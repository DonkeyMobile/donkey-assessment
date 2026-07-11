import { Schema, model, Document, Types } from "mongoose";

export enum AttachmentType {
  PHOTO = "photo",
  VIDEO = "video",
  PDF = "pdf",
}

export interface IAttachment {
  fileName: string;
  url: string;
  type: AttachmentType;
  mimeType: string;
}

export interface IPost extends Document {
  date: Date;
  description: string;
  attachments: IAttachment[];
  comments: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const attachmentSchema = new Schema<IAttachment>(
  {
    fileName: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: Object.values(AttachmentType), required: true },
    mimeType: { type: String, required: true },
  },
  { _id: false }
);

const postSchema = new Schema<IPost>(
  {
    date: { type: Date, required: true },
    description: { type: String, required: true, trim: true },
    attachments: { type: [attachmentSchema], default: [] },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export const Post = model<IPost>("Post", postSchema);
