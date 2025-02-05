import mongoose, { Schema, Document } from "mongoose";
import { PostDocument } from "./Post";

export interface AttachmentDocument extends Document {
  type: string;
  filePath: string;
  post: mongoose.Types.ObjectId | PostDocument;
}

const attachmentSchema = new Schema<AttachmentDocument>({
  type: { type: String, required: true }, // File type (e.g., "image", "pdf")
  filePath: { type: String, required: true }, // Path to file storage
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true } // Tied to a single post
});

// Middleware: When a post is deleted, delete its attachments
attachmentSchema.pre("findOneAndDelete", async function (next) {
    const postId = this.getQuery()._id;

    if (postId) {
        await mongoose.model("Attachment").deleteMany({ post: postId });
    }

    next();
});

const Attachment = mongoose.model<AttachmentDocument>("Attachment", attachmentSchema);
export default Attachment;
