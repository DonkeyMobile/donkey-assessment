import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./User";
import { PostDocument } from "./Post";

export interface CommentDocument extends Document {
  text: string;
  createdAt: Date;
  user: mongoose.Types.ObjectId | UserDocument;
  post: mongoose.Types.ObjectId | PostDocument;
}

const commentSchema = new Schema<CommentDocument>({
  text: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true }, // Reference to Post
});

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);
export default Comment;
