import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    author: string;
    content: string;
    createdAt: Date;
}

export interface IPost extends Document {
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    comments: IComment[];
}

const commentSchema: Schema = new Schema({
    author: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const postSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    comments: [commentSchema]
});

export default mongoose.model<IPost>('Post', postSchema);
