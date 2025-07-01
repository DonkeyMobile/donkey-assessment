import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { NotFoundException, forwardRef } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { AttachmentsService } from '../attachments/attachments.service';
import { CreatePostDto, UpdatePostDto } from './posts.controller';

describe('PostsService', () => {
  let service: PostsService;
  let mockPostModel: any;
  let mockAttachmentsService: Partial<AttachmentsService>;

  const mockPost = {
    id: 'test-id',
    dateTime: new Date().toISOString(),
    description: 'Test post description',
    comments: [],
    attachments: [],
    toObject: jest.fn().mockReturnThis(),
  };

  beforeEach(async () => {
    mockPostModel = {
      create: jest.fn().mockResolvedValue(mockPost),
      find: jest.fn().mockReturnThis(),
      findOne: jest.fn().mockReturnThis(),
      updateOne: jest.fn().mockReturnThis(),
      deleteOne: jest.fn().mockReturnThis(),
      countDocuments: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([mockPost]),
    };

    mockAttachmentsService = {
      deleteAttachmentFilesForPost: jest.fn().mockResolvedValue(undefined),
    };

    // Configure findOne to return mockPost by default
    mockPostModel.findOne.mockReturnThis();
    mockPostModel.exec.mockResolvedValue(mockPost);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken(Post.name),
          useValue: mockPostModel,
        },
        {
          provide: AttachmentsService,
          useValue: mockAttachmentsService,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should create a sample post if no post with the sample ID exists', async () => {
      // Mock findOne to return null (no post found)
      mockPostModel.exec.mockResolvedValueOnce(null);

      await service.onModuleInit();

      // Verify that create was called with the sample post data
      expect(mockPostModel.findOne).toHaveBeenCalledWith({
        id: service['SAMPLE_POST_ID'],
      });
      expect(mockPostModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          id: service['SAMPLE_POST_ID'],
          description: 'This is a sample post for testing purposes',
        }),
      );
    });

    it('should not create a sample post if a post with the sample ID already exists', async () => {
      // Mock findOne to return a post
      const existingPost = {
        id: service['SAMPLE_POST_ID'],
        dateTime: '2025-07-01T10:00:00Z',
        description: 'Existing post',
        comments: [],
        attachments: [],
      };
      mockPostModel.exec.mockResolvedValueOnce(existingPost);

      await service.onModuleInit();

      // Verify that findOne was called but create was not
      expect(mockPostModel.findOne).toHaveBeenCalledWith({
        id: service['SAMPLE_POST_ID'],
      });
      expect(mockPostModel.create).not.toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a post', async () => {
      const createPostDto: CreatePostDto = {
        description: 'Test post description',
      };

      const post = await service.create(createPostDto);

      expect(post).toBeDefined();
      expect(post.id).toBeDefined();
      expect(post.dateTime).toBeDefined();
      expect(post.description).toBe(createPostDto.description);
      expect(post.comments).toEqual([]);
      expect(post.attachments).toEqual([]);
      expect(mockPostModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
          description: createPostDto.description,
          comments: [],
          attachments: [],
        }),
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      mockPostModel.exec.mockResolvedValueOnce([mockPost]);

      const posts = await service.findAll();

      expect(posts).toBeDefined();
      expect(Array.isArray(posts)).toBe(true);
      expect(mockPostModel.find).toHaveBeenCalled();
      expect(mockPostModel.exec).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a post when given a valid id', async () => {
      const postId = 'test-id';

      const foundPost = await service.findOne(postId);

      expect(foundPost).toBeDefined();
      expect(foundPost.id).toBe(postId);
      expect(mockPostModel.findOne).toHaveBeenCalledWith({ id: postId });
      expect(mockPostModel.exec).toHaveBeenCalled();
    });

    it('should throw NotFoundException when given an invalid id', async () => {
      mockPostModel.exec.mockResolvedValueOnce(null);

      await expect(service.findOne('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPostModel.findOne).toHaveBeenCalledWith({ id: 'invalid-id' });
      expect(mockPostModel.exec).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a post when given a valid id', async () => {
      const postId = 'test-id';
      const updatePostDto: UpdatePostDto = {
        description: 'Updated description',
      };

      const updatedPost = await service.update(postId, updatePostDto);

      expect(updatedPost).toBeDefined();
      expect(updatedPost.id).toBe(postId);
      expect(mockPostModel.findOne).toHaveBeenCalledWith({ id: postId });
      expect(mockPostModel.updateOne).toHaveBeenCalledWith(
        { id: postId },
        expect.objectContaining({ description: 'Updated description' }),
      );
      expect(mockPostModel.exec).toHaveBeenCalled();
    });

    it('should throw NotFoundException when trying to update with an invalid id', async () => {
      mockPostModel.exec.mockResolvedValueOnce(null);
      const updatePostDto: UpdatePostDto = {
        description: 'Updated description',
      };

      await expect(service.update('invalid-id', updatePostDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPostModel.findOne).toHaveBeenCalledWith({ id: 'invalid-id' });
      expect(mockPostModel.exec).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a post when given a valid id', async () => {
      const postId = 'test-id';

      await service.remove(postId);

      expect(mockPostModel.findOne).toHaveBeenCalledWith({ id: postId });
      expect(mockPostModel.deleteOne).toHaveBeenCalledWith({ id: postId });
      expect(mockPostModel.exec).toHaveBeenCalled();
      // Since the mock post has no attachments, deleteAttachmentFilesForPost should not be called
      expect(
        mockAttachmentsService.deleteAttachmentFilesForPost,
      ).not.toHaveBeenCalled();
    });

    it('should delete attachment files when removing a post with attachments', async () => {
      const postId = 'test-id-with-attachments';
      const postWithAttachments = {
        ...mockPost,
        id: postId,
        attachments: [
          {
            id: 'attachment-1',
            filename: 'test-file.jpg',
            originalname: 'test-file.jpg',
            mimetype: 'image/jpeg',
            size: 1024,
            path: 'uploads/test-file.jpg',
            uploadDate: new Date().toISOString(),
          },
        ],
      };

      mockPostModel.exec.mockResolvedValueOnce(postWithAttachments);

      await service.remove(postId);

      expect(mockPostModel.findOne).toHaveBeenCalledWith({ id: postId });
      expect(
        mockAttachmentsService.deleteAttachmentFilesForPost,
      ).toHaveBeenCalledWith(postWithAttachments.attachments);
      expect(mockPostModel.deleteOne).toHaveBeenCalledWith({ id: postId });
      expect(mockPostModel.exec).toHaveBeenCalled();
    });

    it('should throw NotFoundException when trying to remove with an invalid id', async () => {
      mockPostModel.exec.mockResolvedValueOnce(null);

      await expect(service.remove('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockPostModel.findOne).toHaveBeenCalledWith({ id: 'invalid-id' });
      expect(mockPostModel.exec).toHaveBeenCalled();
    });
  });
});
