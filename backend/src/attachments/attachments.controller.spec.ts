import { Test, TestingModule } from '@nestjs/testing';
import { AttachmentsController } from './attachments.controller';
import { Attachment, AttachmentsService } from './attachments.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('AttachmentsController', () => {
  let controller: AttachmentsController;
  let service: AttachmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttachmentsController],
      providers: [
        {
          provide: AttachmentsService,
          useValue: {
            uploadAttachment: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            removeAttachment: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AttachmentsController>(AttachmentsController);
    service = module.get<AttachmentsService>(AttachmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('uploadAttachment', () => {
    it('should upload an attachment to a post', async () => {
      const postId = 'test-id';
      const file = {
        originalname: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        buffer: Buffer.from('test'),
      } as Express.Multer.File;

      const expectedResult: Attachment = {
        id: 'attachment-id',
        filename: 'test.jpg',
        originalname: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        path: 'uploads/test.jpg',
        uploadDate: new Date().toISOString(),
      };

      jest.spyOn(service, 'uploadAttachment').mockResolvedValue(expectedResult);

      const result = await controller.uploadAttachment(postId, file);

      expect(result).toBe(expectedResult);
      expect(service.uploadAttachment).toHaveBeenCalledWith(
        expect.objectContaining({
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
        }),
        postId,
      );
    });

    it('should throw BadRequestException when no file is uploaded', async () => {
      const postId = 'test-id';

      await expect(
        controller.uploadAttachment(postId, undefined),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of attachments', async () => {
      const postId = 'test-id';
      const expectedResult: Attachment[] = [
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

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll(postId);

      expect(result).toBe(expectedResult);
      expect(service.findAll).toHaveBeenCalledWith(postId);
    });
  });

  describe('findOne', () => {
    it('should return an attachment when given a valid id', async () => {
      const postId = 'test-id';
      const attachmentId = 'attachment-id';
      const expectedResult: Attachment = {
        id: attachmentId,
        filename: 'test.jpg',
        originalname: 'test.jpg',
        mimetype: 'image/jpeg',
        size: 1024,
        path: 'uploads/test.jpg',
        uploadDate: new Date().toISOString(),
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne(postId, attachmentId);

      expect(result).toBe(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(postId, attachmentId);
    });

    it('should throw NotFoundException when given an invalid id', async () => {
      const postId = 'test-id';
      const attachmentId = 'invalid-id';

      jest
        .spyOn(service, 'findOne')
        .mockRejectedValue(
          new NotFoundException(
            `Attachment with ID ${attachmentId} not found in post ${postId}`,
          ),
        );

      await expect(controller.findOne(postId, attachmentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.findOne).toHaveBeenCalledWith(postId, attachmentId);
    });
  });

  describe('remove', () => {
    it('should remove an attachment from a post', async () => {
      const postId = 'test-id';
      const attachmentId = 'attachment-id';

      jest.spyOn(service, 'removeAttachment').mockResolvedValue(undefined);

      const result = await controller.remove(postId, attachmentId);

      expect(result).toBeUndefined();
      expect(service.removeAttachment).toHaveBeenCalledWith(
        postId,
        attachmentId,
      );
    });

    it('should throw NotFoundException when trying to remove with an invalid post id', async () => {
      const postId = 'invalid-id';
      const attachmentId = 'attachment-id';

      jest
        .spyOn(service, 'removeAttachment')
        .mockRejectedValue(
          new NotFoundException(`Post with ID ${postId} not found`),
        );

      await expect(controller.remove(postId, attachmentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.removeAttachment).toHaveBeenCalledWith(
        postId,
        attachmentId,
      );
    });

    it('should throw NotFoundException when trying to remove with an invalid attachment id', async () => {
      const postId = 'test-id';
      const attachmentId = 'invalid-id';

      jest
        .spyOn(service, 'removeAttachment')
        .mockRejectedValue(
          new NotFoundException(`Attachment with ID ${attachmentId} not found`),
        );

      await expect(controller.remove(postId, attachmentId)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.removeAttachment).toHaveBeenCalledWith(
        postId,
        attachmentId,
      );
    });
  });
});
