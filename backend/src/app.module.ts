import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StaticModule } from './static/static.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/timeline'),
    PostsModule,
    CommentsModule,
    AttachmentsModule,
    StaticModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
