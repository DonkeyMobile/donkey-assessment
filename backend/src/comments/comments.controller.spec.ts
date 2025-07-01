import { Test, TestingModule } from '@nestjs/testing';
import {
  CommentsController,
  CreateCommentDto,
  UpdateCommentDto,
} from './comments.controller';
import { Comment, CommentsService } from './comments.service';
import { NotFoundException } from '@nestjs/common';

describe('CommentsController', () => {
  let controller: CommentsController;
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        {
          provide: CommentsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a comment for a post', async () => {
      const postId = 'test-post-id';
      const createCommentDto: CreateCommentDto = {
        content: 'Test comment content',
      };

      const expectedResult: Comment = {
        id: 'test-comment-id',
        dateTime: new Date().toISOString(),
        content: createCommentDto.content,
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(postId, createCommentDto);

      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(postId, createCommentDto);
    });

    it('should throw NotFoundException when post does not exist', async () => {
      const postId = 'non-existent-post-id';
      const createCommentDto: CreateCommentDto = {
        content: 'Test comment content',
      };

      jest
        .spyOn(service, 'create')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(controller.create(postId, createCommentDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.create).toHaveBeenCalledWith(postId, createCommentDto);
    });
  });

  describe('findAll', () => {
    it('should return all comments for a post', async () => {
      const postId = 'test-post-id';
      const expectedResult: Comment[] = [
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

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll(postId);

      expect(result).toBe(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(postId);
    });

    it('should throw NotFoundException when post does not exist', async () => {
      const postId = 'non-existent-post-id';

      jest
        .spyOn(service, 'findAll')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(controller.findAll(postId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findAll).toHaveBeenCalledWith(postId);
    });
  });

  describe('findOne', () => {
    it('should return a comment when given valid post and comment ids', async () => {
      const postId = 'test-post-id';
      const commentId = 'test-comment-id';

      const expectedResult: Comment = {
        id: commentId,
        dateTime: new Date().toISOString(),
        content: 'Test comment',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne(postId, commentId);

      expect(result).toBe(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(postId, commentId);
    });

    it('should throw NotFoundException when post does not exist', async () => {
      const postId = 'non-existent-post-id';
      const commentId = 'test-comment-id';

      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(controller.findOne(postId, commentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith(postId, commentId);
    });

    it('should throw NotFoundException when comment does not exist in post', async () => {
      const postId = 'test-post-id';
      const commentId = 'non-existent-comment-id';

      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException(
            `Comment with ID ${commentId} not found in post with ID ${postId}`,
          ),
        );

      await expect(controller.findOne(postId, commentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith(postId, commentId);
    });
  });

  describe('update', () => {
    it('should update a comment when given valid post and comment ids', async () => {
      const postId = 'test-post-id';
      const commentId = 'test-comment-id';
      const updateCommentDto: UpdateCommentDto = {
        content: 'Updated comment content',
      };

      const expectedResult: Comment = {
        id: commentId,
        dateTime: new Date().toISOString(),
        content: updateCommentDto.content || 'Updated content',
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

      const result = await controller.update(
        postId,
        commentId,
        updateCommentDto,
      );

      expect(result).toBe(expectedResult);
      expect(service.update).toHaveBeenCalledWith(
        postId,
        commentId,
        updateCommentDto,
      );
    });

    it('should throw NotFoundException when post does not exist', async () => {
      const postId = 'non-existent-post-id';
      const commentId = 'test-comment-id';
      const updateCommentDto: UpdateCommentDto = {
        content: 'Updated comment content',
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(
        controller.update(postId, commentId, updateCommentDto),
      ).rejects.toThrow(NotFoundException);
      expect(service.update).toHaveBeenCalledWith(
        postId,
        commentId,
        updateCommentDto,
      );
    });

    it('should throw NotFoundException when comment does not exist in post', async () => {
      const postId = 'test-post-id';
      const commentId = 'non-existent-comment-id';
      const updateCommentDto: UpdateCommentDto = {
        content: 'Updated comment content',
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new NotFoundException(
            `Comment with ID ${commentId} not found in post ${postId}`,
          ),
        );

      await expect(
        controller.update(postId, commentId, updateCommentDto),
      ).rejects.toThrow(NotFoundException);
      expect(service.update).toHaveBeenCalledWith(
        postId,
        commentId,
        updateCommentDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a comment when given valid post and comment ids', async () => {
      const postId = 'test-post-id';
      const commentId = 'test-comment-id';

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove(postId, commentId);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(postId, commentId);
    });

    it('should throw NotFoundException when post does not exist', async () => {
      const postId = 'non-existent-post-id';
      const commentId = 'test-comment-id';

      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(controller.remove(postId, commentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.remove).toHaveBeenCalledWith(postId, commentId);
    });

    it('should throw NotFoundException when comment does not exist in post', async () => {
      const postId = 'test-post-id';
      const commentId = 'non-existent-comment-id';

      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(
          new NotFoundException(
            `Comment with ID ${commentId} not found in post ${postId}`,
          ),
        );

      await expect(controller.remove(postId, commentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.remove).toHaveBeenCalledWith(postId, commentId);
    });
  });
});
