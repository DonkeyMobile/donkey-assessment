import mongoose, { Schema } from "mongoose";
const attachmentSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    file: { type: Buffer, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, //reference to Post model
    createdAt: { type: Date, default: Date.now }
});
export const Attachment = mongoose.model("Attachment", attachmentSchema);
