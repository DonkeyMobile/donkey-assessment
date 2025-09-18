import mongoose, { Schema } from "mongoose";
import { Attachment } from "./attachment.js";
import { Comment } from "./comment.js";
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    timelineId: { type: Schema.Types.ObjectId, ref: 'Timeline', required: true }, //reference to Timeline model
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, //reference to User model
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
// Cascaded delete: remove comments when a post is deleted
postSchema.pre("findOneAndDelete", async function (next) {
    const post = await this.model.findOne(this.getFilter());
    if (post) {
        await Comment.deleteMany({ postId: post._id });
    }
    next();
});
export const Post = mongoose.model("Post", postSchema);
