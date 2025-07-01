import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { PostsService } from '../posts/posts.service';
import { CreateAttachmentDto } from './attachments.controller';

export class Attachment {
  id: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
  uploadDate: string;
}

@Injectable()
export class AttachmentsService {
  private readonly uploadsFolder = 'uploads';

  constructor(
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {
    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(this.uploadsFolder)) {
      fs.mkdirSync(this.uploadsFolder, { recursive: true });
    }
  }

  async uploadAttachment(
    file: CreateAttachmentDto,
    postId: string,
  ): Promise<Attachment> {
    const post = await this.postsService.findOne(postId);

    const filename = `${uuidv4()}-${file.originalname.replace(/\s/g, '_')}`;
    const filePath = path.join(this.uploadsFolder, filename);

    // Write the file to disk
    fs.writeFileSync(filePath, file.buffer);

    const attachment: Attachment = {
      id: uuidv4(),
      filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: filePath,
      uploadDate: new Date().toISOString(),
    };

    // Add the attachment to the post
    post.attachments.push(attachment);
    await this.postsService.update(postId, { attachments: post.attachments });

    return attachment;
  }

  async findAll(postId: string): Promise<Attachment[]> {
    const post = await this.postsService.findOne(postId);
    return post.attachments;
  }

  async findOne(postId: string, attachmentId: string): Promise<Attachment> {
    const post = await this.postsService.findOne(postId);
    const attachment = post.attachments.find((a) => a.id === attachmentId);

    if (!attachment) {
      throw new NotFoundException(
        `Attachment with ID ${attachmentId} not found in post ${postId}`,
      );
    }

    return attachment;
  }

  async removeAttachment(postId: string, attachmentId: string): Promise<void> {
    const post = await this.postsService.findOne(postId);

    const attachmentIndex = post.attachments.findIndex(
      (a) => a.id === attachmentId,
    );
    if (attachmentIndex === -1) {
      throw new NotFoundException(
        `Attachment with ID ${attachmentId} not found`,
      );
    }

    const attachment = post.attachments[attachmentIndex];

    // Delete the file from disk
    try {
      const filePath = path.join(this.uploadsFolder, attachment.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error(`Error deleting file: ${error.message}`);
    }

    // Remove the attachment from the post
    post.attachments.splice(attachmentIndex, 1);
    await this.postsService.update(postId, { attachments: post.attachments });
  }

  /**
   * Deletes all attachment files associated with a post
   * @param postId The ID of the post
   * @param attachments The attachments to delete
   */
  async deleteAttachmentFilesForPost(attachments: Attachment[]): Promise<void> {
    if (attachments && attachments.length > 0) {
      for (const attachment of attachments) {
        try {
          const filePath = path.join(this.uploadsFolder, attachment.filename);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        } catch (error) {
          console.error(`Error deleting attachment file: ${error.message}`);
        }
      }
    }
  }
}
