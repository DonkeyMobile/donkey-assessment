import mongoose, { Schema } from "mongoose";
import { Comment } from "./comment.js";
import { Attachment } from "./attachment.js";
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Title must be at least 2 characters"],
        maxlength: [500, "Title must be under 100 characters"]
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Content must be at least 2 characters"],
        maxlength: [500, "Content must be under 500 characters"]
    },
    timelineId: { type: Schema.Types.ObjectId, ref: 'Timeline', required: true }, //reference to Timeline model
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, //reference to User model
    comments: { type: [Comment.schema], default: [] },
    createdAt: { type: Date, default: Date.now }
});
// Cascaded delete: remove attachments when a post is deleted
postSchema.pre("findOneAndDelete", async function (next) {
    const post = await this.model.findOne(this.getFilter());
    if (post) {
        await Attachment.deleteMany({ postId: post._id });
    }
    next();
});
export const Post = mongoose.model("Post", postSchema);
