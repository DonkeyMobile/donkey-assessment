import mongoose, { Schema, Document } from "mongoose";
import Post from "./Post"; // Import Post model
import Comment from "./Comment"; // Import Comment model
import Attachment from "./Attachment"; // Import Attachment model

export interface UserDocument extends Document {
    name: string;
    email: string;
}

const userSchema = new Schema<UserDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
});

// Middleware: When a user is deleted, delete all their posts, comments, AND attachments
userSchema.pre("findOneAndDelete", async function (next) {
    const userId = this.getQuery()._id;

    if (userId) {
        const posts = await Post.find({ user: userId });

        // ✅ Delete all attachments related to the user's posts
        for (const post of posts) {
            await Attachment.deleteMany({ post: post._id });
            await Comment.deleteMany({ post: post._id }); // ✅ Delete all comments under the post
        }

        // ✅ Delete all posts & comments made by the user
        await Post.deleteMany({ user: userId }); // ✅ Delete user's posts
        await Comment.deleteMany({ user: userId }); // ✅ Delete user's own comments
    }

    next();
});

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
