import { Schema, Types, model } from "mongoose";

interface IAttachment {
  fileName: string;
  fileType: string;
  path: string;
}

const attachmentSchema = new Schema<IAttachment>(
  {
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    path: { type: String, required: true },
  },
  { _id: false }
);

export default attachmentSchema;
export type { IAttachment };
