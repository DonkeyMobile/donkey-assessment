import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PostsService } from '../posts/posts.service';
import { CreateCommentDto, UpdateCommentDto } from './comments.controller';

@Injectable()
export class CommentsService {
  constructor(private readonly postsService: PostsService) {}

  async create(
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const post = await this.postsService.findOne(postId);

    const comment: Comment = {
      id: uuidv4(),
      dateTime: new Date().toISOString(),
      content: createCommentDto.content,
    };

    // Add comment to post
    await this.postsService.update(postId, {
      comments: [...post.comments, comment],
    });

    return comment;
  }

  async findAll(postId: string): Promise<Comment[]> {
    const post = await this.postsService.findOne(postId);
    return post.comments;
  }

  async findOne(postId: string, commentId: string): Promise<Comment> {
    const post = await this.postsService.findOne(postId);
    const comment = post.comments.find((comment) => comment.id === commentId);

    if (!comment) {
      throw new NotFoundException(
        `Comment with ID ${commentId} not found in post ${postId}`,
      );
    }

    return comment;
  }

  async update(
    postId: string,
    commentId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const post = await this.postsService.findOne(postId);
    const commentIndex = post.comments.findIndex(
      (comment) => comment.id === commentId,
    );

    if (commentIndex === -1) {
      throw new NotFoundException(
        `Comment with ID ${commentId} not found in post ${postId}`,
      );
    }

    const updatedComment = {
      ...post.comments[commentIndex],
      ...updateCommentDto,
    };

    // Update the comments array
    const updatedComments = [...post.comments];
    updatedComments[commentIndex] = updatedComment;

    // Update the post with the new comments array
    await this.postsService.update(postId, {
      comments: updatedComments,
    });

    return updatedComment;
  }

  async remove(postId: string, commentId: string): Promise<void> {
    const post = await this.postsService.findOne(postId);
    const commentIndex = post.comments.findIndex(
      (comment) => comment.id === commentId,
    );

    if (commentIndex === -1) {
      throw new NotFoundException(
        `Comment with ID ${commentId} not found in post ${postId}`,
      );
    }

    // Remove the comment from the array
    const updatedComments = [...post.comments];
    updatedComments.splice(commentIndex, 1);

    // Update the post with the new comments array
    await this.postsService.update(postId, {
      comments: updatedComments,
    });
  }
}

export class Comment {
  id: string;
  dateTime: string;
  content: string;
}
