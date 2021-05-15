import mongoose, {Document, Schema} from '../../common/services/mongoose.service';


interface IAttachment {
  filename: string;
  url: string;
}

interface IAttachmentModel extends mongoose.Model<IAttachmentDocument> {
  build(attachment: IAttachment): IAttachmentDocument;
}

interface IAttachmentDocument extends IAttachment, Document {
}

const attachmentSchemaFields: Record<keyof IAttachment, any> = {
  filename: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
};

let attachmentSchema: Schema = new Schema(attachmentSchemaFields);

attachmentSchema.statics.build = function (attachment: IAttachment): IAttachmentDocument {
  return new Attachment(attachment);
}

const Attachment: IAttachmentModel = mongoose.model<IAttachmentDocument, IAttachmentModel>('Attachment', attachmentSchema);

export {Attachment, attachmentSchema};