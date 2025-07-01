import { Test, TestingModule } from '@nestjs/testing';
import {
  CreatePostDto,
  PostsController,
  UpdatePostDto,
} from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { NotFoundException } from '@nestjs/common';

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
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

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a post', async () => {
      const createPostDto: CreatePostDto = {
        description: 'Test post description',
      };

      const expectedResult: Post = {
        id: 'test-id',
        dateTime: new Date().toISOString(),
        description: createPostDto.description,
        comments: [],
        attachments: [],
      };

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(createPostDto);

      expect(result).toBe(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createPostDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const expectedResult: Post[] = [
        {
          id: 'test-id-1',
          dateTime: new Date().toISOString(),
          description: 'Test post 1',
          comments: [],
          attachments: [],
        },
        {
          id: 'test-id-2',
          dateTime: new Date().toISOString(),
          description: 'Test post 2',
          comments: [],
          attachments: [],
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toBe(expectedResult);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a post when given a valid id', async () => {
      const postId = 'test-id';
      const expectedResult: Post = {
        id: postId,
        dateTime: new Date().toISOString(),
        description: 'Test post',
        comments: [],
        attachments: [],
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne(postId);

      expect(result).toBe(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(postId);
    });

    it('should throw NotFoundException when given an invalid id', async () => {
      const postId = 'invalid-id';

      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(controller.findOne(postId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith(postId);
    });
  });

  describe('update', () => {
    it('should update a post when given a valid id', async () => {
      const postId = 'test-id';
      const updatePostDto: UpdatePostDto = {
        description: 'Updated description',
      };

      const expectedResult: Post = {
        id: postId,
        dateTime: new Date().toISOString(),
        description: updatePostDto.description || 'Updated description',
        comments: [],
        attachments: [],
      };

      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);

      const result = await controller.update(postId, updatePostDto);

      expect(result).toBe(expectedResult);
      expect(service.update).toHaveBeenCalledWith(postId, updatePostDto);
    });

    it('should throw NotFoundException when trying to update with an invalid id', async () => {
      const postId = 'invalid-id';
      const updatePostDto: UpdatePostDto = {
        description: 'Updated description',
      };

      jest
        .spyOn(service, 'update')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(controller.update(postId, updatePostDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.update).toHaveBeenCalledWith(postId, updatePostDto);
    });
  });

  describe('remove', () => {
    it('should remove a post when given a valid id', async () => {
      const postId = 'test-id';

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove(postId);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(postId);
    });

    it('should throw NotFoundException when trying to remove with an invalid id', async () => {
      const postId = 'invalid-id';

      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(controller.remove(postId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.remove).toHaveBeenCalledWith(postId);
    });
  });
});
