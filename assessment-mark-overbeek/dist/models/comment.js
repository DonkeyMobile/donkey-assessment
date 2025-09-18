import mongoose, { Schema } from "mongoose";
const commentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, //reference to Post model
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, //reference to User model
    createdAt: { type: Date, default: Date.now }
});
export const Comment = mongoose.model("Comment", commentSchema);
