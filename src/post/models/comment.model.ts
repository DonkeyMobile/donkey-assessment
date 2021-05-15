import mongoose, {Document, Schema} from '../../common/services/mongoose.service';


interface IComment {
  name: string;
  text: string;
}

interface ICommentModel extends mongoose.Model<ICommentDocument> {
  build(comment: IComment): ICommentDocument;
}

interface ICommentDocument extends IComment, Document {
}

const commentSchemaFields: Record<keyof IComment, any> = {
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
};

let commentSchema: Schema = new Schema(commentSchemaFields);

commentSchema.statics.build = function (comment: IComment): ICommentDocument {
  return new Comment(comment);
}

const Comment: ICommentModel = mongoose.model<ICommentDocument, ICommentModel>('Comment', commentSchema);

export {Comment, commentSchema};