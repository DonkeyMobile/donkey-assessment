import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from '../../comments/comments.service';
import { Attachment } from '../../attachments/attachments.service';

@Schema()
export class Post {
  @Prop()
  id: string;

  @Prop()
  dateTime: string;

  @Prop()
  description: string;

  @Prop({ type: [Object], default: [] })
  comments: Comment[] = [];

  @Prop({ type: [Object], default: [] })
  attachments: Attachment[] = [];
}

export const PostSchema = SchemaFactory.createForClass(Post);
