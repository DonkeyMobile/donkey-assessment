import { Test, TestingModule } from '@nestjs/testing';
import { Attachment, AttachmentsService } from './attachments.service';
import { PostsService } from '../posts/posts.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateAttachmentDto } from './attachments.controller';

jest.mock('fs');
jest.mock('path');

describe('AttachmentsService', () => {
  let service: AttachmentsService;
  let postsService: PostsService;
  let mockAttachmentModel: any;

  beforeEach(async () => {
    mockAttachmentModel = {
      create: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      updateOne: jest.fn(),
      deleteOne: jest.fn(),
      exec: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AttachmentsService,
        {
          provide: PostsService,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: getModelToken(Attachment.name),
          useValue: mockAttachmentModel,
        },
      ],
    }).compile();

    service = module.get<AttachmentsService>(AttachmentsService);
    postsService = module.get<PostsService>(PostsService);

    // Mock fs.existsSync to return true
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    // Mock fs.writeFileSync to do nothing
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});
    // Mock path.join to return a simple path
    (path.join as jest.Mock).mockImplementation((...args) => args.join('/'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadAttachment', () => {
    it('should upload an attachment to a post', async () => {
      const postId = 'test-id';
      const file: CreateAttachmentDto = {
        originalname: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from('test'),
      };

      const post = {
        id: postId,
        attachments: [],
      };

      const expectedAttachment = {
        id: expect.any(String),
        filename: expect.stringContaining(file.originalname),
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        path: expect.stringContaining(file.originalname),
        uploadDate: expect.any(String),
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(post as any);
      jest.spyOn(postsService, 'update').mockResolvedValue(post as any);

      const result = await service.uploadAttachment(file, postId);

      expect(result).toMatchObject(expectedAttachment);
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
      expect(postsService.update).toHaveBeenCalledWith(postId, {
        attachments: [expectedAttachment],
      });
      expect(fs.writeFileSync).toHaveBeenCalled();
    });

    it('should throw NotFoundException when post is not found', async () => {
      const postId = 'invalid-id';
      const file: CreateAttachmentDto = {
        originalname: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from('test'),
      };

      jest
        .spyOn(postsService, 'findOne')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(service.uploadAttachment(file, postId)).rejects.toThrow(
        NotFoundException,
      );
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });
  });

  describe('findAll', () => {
    it('should return all attachments for a post', async () => {
      const postId = 'test-id';
      const attachments = [
        {
          id: 'attachment-id-1',
          filename: 'test1.jpg',
          originalname: 'test1.jpg',
          mimetype: 'image/jpeg',
          size: 1024,
          path: 'uploads/test1.jpg',
          uploadDate: new Date().toISOString(),
        },
        {
          id: 'attachment-id-2',
          filename: 'test2.jpg',
          originalname: 'test2.jpg',
          mimetype: 'image/jpeg',
          size: 2048,
          path: 'uploads/test2.jpg',
          uploadDate: new Date().toISOString(),
        },
      ];

      const post = {
        id: postId,
        attachments,
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(post as any);

      const result = await service.findAll(postId);

      expect(result).toBe(attachments);
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });

    it('should throw NotFoundException when post is not found', async () => {
      const postId = 'invalid-id';

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
    it('should return an attachment when given a valid id', async () => {
      const postId = 'test-id';
      const attachmentId = 'attachment-id';
      const attachment = {
        id: attachmentId,
        filename: 'test.jpg',
        originalname: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        path: 'uploads/test.jpg',
        uploadDate: new Date().toISOString(),
      };

      const post = {
        id: postId,
        attachments: [attachment],
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(post as any);

      const result = await service.findOne(postId, attachmentId);

      expect(result).toBe(attachment);
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });

    it('should throw NotFoundException when post is not found', async () => {
      const postId = 'invalid-id';
      const attachmentId = 'attachment-id';

      jest
        .spyOn(postsService, 'findOne')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(service.findOne(postId, attachmentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });

    it('should throw NotFoundException when attachment is not found', async () => {
      const postId = 'test-id';
      const attachmentId = 'invalid-id';

      const post = {
        id: postId,
        attachments: [],
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(post as any);

      await expect(service.findOne(postId, attachmentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });
  });

  describe('removeAttachment', () => {
    it('should remove an attachment from a post', async () => {
      const postId = 'test-id';
      const attachmentId = 'attachment-id';
      const attachment = {
        id: attachmentId,
        filename: 'test.jpg',
        originalname: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        path: 'uploads/test.jpg',
        uploadDate: new Date().toISOString(),
      };

      const post = {
        id: postId,
        attachments: [attachment],
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(post as any);
      jest.spyOn(postsService, 'update').mockResolvedValue(post as any);

      await service.removeAttachment(postId, attachmentId);

      expect(postsService.findOne).toHaveBeenCalledWith(postId);
      expect(postsService.update).toHaveBeenCalledWith(postId, {
        attachments: [],
      });
      expect(fs.existsSync).toHaveBeenCalled();
      expect(fs.unlinkSync).toHaveBeenCalled();
    });

    it('should throw NotFoundException when post is not found', async () => {
      const postId = 'invalid-id';
      const attachmentId = 'attachment-id';

      jest
        .spyOn(postsService, 'findOne')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(
        service.removeAttachment(postId, attachmentId),
      ).rejects.toThrow(NotFoundException);
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });

    it('should throw NotFoundException when attachment is not found', async () => {
      const postId = 'test-id';
      const attachmentId = 'invalid-id';

      const post = {
        id: postId,
        attachments: [],
      };

      jest.spyOn(postsService, 'findOne').mockResolvedValue(post as any);

      await expect(
        service.removeAttachment(postId, attachmentId),
      ).rejects.toThrow(NotFoundException);
      expect(postsService.findOne).toHaveBeenCalledWith(postId);
    });
  });
});
