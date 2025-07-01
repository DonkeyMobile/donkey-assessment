import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { Post } from './entities/post.entity';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AttachmentsService } from '../attachments/attachments.service';
import { CreatePostDto, UpdatePostDto } from './posts.controller';

@Injectable()
export class PostsService implements OnModuleInit {
  // Fixed UUIDs for consistent testing
  private readonly SAMPLE_POST_ID = '9e33b53e-c8b7-4745-b309-9e67d5a26961';
  private readonly SAMPLE_COMMENT_ID_1 = 'c0c85e5b-1e15-463a-a4d6-e75b957fbf06';
  private readonly SAMPLE_COMMENT_ID_2 = '9396cc8e-d4d3-4164-a61d-49a0f0c77c66';

  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @Inject(forwardRef(() => AttachmentsService))
    private readonly attachmentsService: AttachmentsService,
  ) {}

  async onModuleInit() {
    // Check if a post with the sample ID exists, if not, create it
    const existingPost = await this.postModel
      .findOne({ id: this.SAMPLE_POST_ID })
      .exec();
    if (!existingPost) {
      await this.postModel.create({
        id: this.SAMPLE_POST_ID,
        dateTime: '2025-07-01T10:00:00Z',
        description: 'This is a sample post for testing purposes',
        comments: [
          {
            id: this.SAMPLE_COMMENT_ID_1,
            postId: this.SAMPLE_POST_ID,
            content: 'This is the first sample comment',
            dateTime: '2025-07-01T11:30:00Z',
          },
          {
            id: this.SAMPLE_COMMENT_ID_2,
            postId: this.SAMPLE_POST_ID,
            content: 'This is the second sample comment',
            dateTime: '2025-07-01T14:45:00Z',
          },
        ],
        attachments: [
          {
            id: 'c55f7213-e102-4309-9cd0-8be99dbf30cd',
            filename: 'c7467845-81c8-4da8-8485-4a39690f4478-koln.jpg',
            originalname: 'koln.jpg',
            mimetype: 'image/jpeg',
            size: 14526125,
            path: 'uploads/c7467845-81c8-4da8-8485-4a39690f4478-koln.jpg',
            uploadDate: '2025-07-03T17:56:36.544Z',
          },
        ],
      });
    }
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post: Post = {
      id: uuidv4(),
      dateTime: new Date().toISOString(),
      description: createPostDto.description,
      comments: [],
      attachments: [],
    };
    return await this.postModel.create(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findOne({ id }).exec();
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postModel.findOne({ id }).exec();
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    const updatedPost = {
      ...post.toObject(),
      ...updatePostDto,
    };

    await this.postModel.updateOne({ id }, updatedPost).exec();
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const post = await this.postModel.findOne({ id }).exec();
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    // Delete any attachments associated with this post
    if (post.attachments && post.attachments.length > 0) {
      await this.attachmentsService.deleteAttachmentFilesForPost(
        post.attachments,
      );
    }

    await this.postModel.deleteOne({ id }).exec();
  }
}
