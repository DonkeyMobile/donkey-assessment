import mongoose, {Document, Schema} from '../../common/services/mongoose.service';
import {commentSchema} from "./comment.model";
import {attachmentSchema} from "./attachment.model";


interface IPost {
  date: Date;
  description: string;
  comments?: [typeof commentSchema];
  attachments?: [typeof attachmentSchema];
}

interface IPostModel extends mongoose.Model<IPostDocument> {
  build(post: IPost): IPostDocument;
}

interface IPostDocument extends IPost, Document {
}

const postSchemaFields: Record<keyof IPost, any> = {
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  comments: {
    type: [commentSchema],
    default: undefined
  },
  attachments: {
    type: [attachmentSchema],
    default: undefined
  }
};

const postSchema: Schema = new Schema(postSchemaFields);

postSchema.statics.build = function (post: IPost): IPostDocument {
  return new Post(post);
}

const Post: IPostModel = mongoose.model<IPostDocument, IPostModel>('Post', postSchema);

export {Post};