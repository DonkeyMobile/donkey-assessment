import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./User";
import Comment from "./Comment"; // Import Comment model
import Attachment from "./Attachment"; // Import Attachment model

export interface PostDocument extends Document {
    date: Date;
    description: string;
    user: mongoose.Types.ObjectId | UserDocument;
}

const postSchema = new Schema<PostDocument>({
    date: { type: Date, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

// Middleware: When a post is deleted, delete all its comments and attachments
postSchema.pre("findOneAndDelete", async function (next) {
    const postId = this.getQuery()._id;

    if (postId) {
        await Comment.deleteMany({ post: postId }); // ✅ Delete all comments on the post
        await Attachment.deleteMany({ post: postId }); // ✅ Delete all attachments on the post
    }

    next();
});

const Post = mongoose.model<PostDocument>("Post", postSchema);
export default Post;
