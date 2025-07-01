import { Test, TestingModule } from '@nestjs/testing';
import { Comment, CommentsService } from './comments.service';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/entities/post.entity';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto, UpdateCommentDto } from './comments.controller';

describe('CommentsService', () => {
  let service: CommentsService;
  let postsService: PostsService;
  let commentModel: Model<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: PostsService,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getModelToken(Comment.name),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    postsService = module.get<PostsService>(PostsService);
    commentModel = module.get<Model<Comment>>(getModelToken(Comment.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a comment for a post', async () => {
      const postId = 'test-post-id';
      const createCommentDto: CreateCommentDto = {
        content: 'Test comment content',
      };

      const mockPost: Post = {
        id: postId,
        dateTime: new Date().toISOString(),
        description: 'Test post',
        comments: [],
        attachments: [],
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(mockPost);
      jest
        .spyOn(postsService, 'update')
        .mockResolvedValue({ ...mockPost, comments: [expect.any(Object)] });

      const comment = await service.create(postId, createCommentDto);

      expect(comment).toBeDefined();
      expect(comment.id).toBeDefined();
      expect(comment.dateTime).toBeDefined();
      expect(comment.content).toBe(createCommentDto.content);
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
      expect(postsService.update).toHaveBeenCalledWith(postId, {
        comments: [
          expect.objectContaining({
            content: createCommentDto.content,
          }),
        ],
      });
    });

    it('should throw NotFoundException when post does not exist', async () => {
      const postId = 'non-existent-post-id';
      const createCommentDto: CreateCommentDto = {
        content: 'Test comment content',
      };

      jest
        .spyOn(postsService, 'findOne')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(service.create(postId, createCommentDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });
  });

  describe('findAll', () => {
    it('should return all comments for a post', async () => {
      const postId = 'test-post-id';
      const mockComments: Comment[] = [
        {
          id: 'comment-1',
          dateTime: new Date().toISOString(),
          content: 'Comment 1',
        },
        {
          id: 'comment-2',
          dateTime: new Date().toISOString(),
          content: 'Comment 2',
        },
      ];

      const mockPost: Post = {
        id: postId,
        dateTime: new Date().toISOString(),
        description: 'Test post',
        comments: mockComments,
        attachments: [],
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(mockPost);

      const comments = await service.findAll(postId);

      expect(comments).toBe(mockComments);
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });

    it('should throw NotFoundException when post does not exist', async () => {
      const postId = 'non-existent-post-id';

      jest
        .spyOn(postsService, 'findOne')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(service.findAll(postId)).rejects.toThrow(NotFoundException);
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });
  });

  describe('findOne', () => {
    it('should return a comment when given valid post and comment ids', async () => {
      const postId = 'test-post-id';
      const commentId = 'test-comment-id';

      const mockComment: Comment = {
        id: commentId,
        dateTime: new Date().toISOString(),
        content: 'Test comment',
      };

      const mockPost: Post = {
        id: postId,
        dateTime: new Date().toISOString(),
        description: 'Test post',
        comments: [mockComment],
        attachments: [],
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(mockPost);

      const comment = await service.findOne(postId, commentId);

      expect(comment).toBe(mockComment);
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });

    it('should throw NotFoundException when post does not exist', async () => {
      const postId = 'non-existent-post-id';
      const commentId = 'test-comment-id';

      jest
        .spyOn(postsService, 'findOne')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(service.findOne(postId, commentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });

    it('should throw NotFoundException when comment does not exist in post', async () => {
      const postId = 'test-post-id';
      const commentId = 'non-existent-comment-id';

      const mockPost: Post = {
        id: postId,
        dateTime: new Date().toISOString(),
        description: 'Test post',
        comments: [],
        attachments: [],
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(mockPost);

      await expect(service.findOne(postId, commentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });
  });

  describe('update', () => {
    it('should update a comment when given valid post and comment ids', async () => {
      const postId = 'test-post-id';
      const commentId = 'test-comment-id';
      const updateCommentDto: UpdateCommentDto = {
        content: 'Updated comment content',
      };

      const originalComment: Comment = {
        id: commentId,
        dateTime: new Date().toISOString(),
        content: 'Original comment content',
      };

      const mockPost: Post = {
        id: postId,
        dateTime: new Date().toISOString(),
        description: 'Test post',
        comments: [originalComment],
        attachments: [],
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(mockPost);
      jest.spyOn(postsService, 'update').mockResolvedValue({
        ...mockPost,
        comments: [{ ...originalComment, ...updateCommentDto }],
      });

      const updatedComment = await service.update(
        postId,
        commentId,
        updateCommentDto,
      );

      expect(updatedComment).toBeDefined();
      expect(updatedComment.id).toBe(commentId);
      expect(updatedComment.content).toBe(updateCommentDto.content);
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
      expect(postsService.update).toHaveBeenCalledWith(postId, {
        comments: [
          expect.objectContaining({
            id: commentId,
            content: updateCommentDto.content,
          }),
        ],
      });
    });

    it('should throw NotFoundException when post does not exist', async () => {
      const postId = 'non-existent-post-id';
      const commentId = 'test-comment-id';
      const updateCommentDto: UpdateCommentDto = {
        content: 'Updated comment content',
      };

      jest
        .spyOn(postsService, 'findOne')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(
        service.update(postId, commentId, updateCommentDto),
      ).rejects.toThrow(NotFoundException);
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });

    it('should throw NotFoundException when comment does not exist in post', async () => {
      const postId = 'test-post-id';
      const commentId = 'non-existent-comment-id';
      const updateCommentDto: UpdateCommentDto = {
        content: 'Updated comment content',
      };

      const mockPost: Post = {
        id: postId,
        dateTime: new Date().toISOString(),
        description: 'Test post',
        comments: [],
        attachments: [],
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(mockPost);

      await expect(
        service.update(postId, commentId, updateCommentDto),
      ).rejects.toThrow(NotFoundException);
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });
  });

  describe('remove', () => {
    it('should remove a comment when given valid post and comment ids', async () => {
      const postId = 'test-post-id';
      const commentId = 'test-comment-id';

      const mockComment: Comment = {
        id: commentId,
        dateTime: new Date().toISOString(),
        content: 'Test comment',
      };

      const mockPost: Post = {
        id: postId,
        dateTime: new Date().toISOString(),
        description: 'Test post',
        comments: [mockComment],
        attachments: [],
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(mockPost);
      jest.spyOn(postsService, 'update').mockResolvedValue({
        ...mockPost,
        comments: [],
      });

      await service.remove(postId, commentId);

      expect(postsService.findOne).toHaveBeenCalledWith(postId);
      expect(postsService.update).toHaveBeenCalledWith(postId, {
        comments: [],
      });
    });

    it('should throw NotFoundException when post does not exist', async () => {
      const postId = 'non-existent-post-id';
      const commentId = 'test-comment-id';

      jest
        .spyOn(postsService, 'findOne')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(service.remove(postId, commentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });

    it('should throw NotFoundException when comment does not exist in post', async () => {
      const postId = 'test-post-id';
      const commentId = 'non-existent-comment-id';

      const mockPost: Post = {
        id: postId,
        dateTime: new Date().toISOString(),
        description: 'Test post',
        comments: [],
        attachments: [],
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(mockPost);

      await expect(service.remove(postId, commentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });
  });
});
