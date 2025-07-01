import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import { AttachmentsService } from './attachments.service';
import { Response } from 'express';

export class CreateAttachmentDto {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Controller('posts/:postId/attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadAttachment(
    @Param('postId') postId: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Read the file from disk if buffer is not available
    let buffer = file.buffer;
    if (!buffer && file.path) {
      buffer = fs.readFileSync(file.path);
    }

    const attachmentDto: CreateAttachmentDto = {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: buffer,
    };

    return this.attachmentsService.uploadAttachment(attachmentDto, postId);
  }

  @Get()
  async findAll(@Param('postId') postId: string) {
    return this.attachmentsService.findAll(postId);
  }

  @Get(':id')
  async findOne(@Param('postId') postId: string, @Param('id') id: string) {
    return this.attachmentsService.findOne(postId, id);
  }

  @Delete(':id')
  async remove(@Param('postId') postId: string, @Param('id') id: string) {
    return this.attachmentsService.removeAttachment(postId, id);
  }

  @Get(':id/content')
  async getAttachmentContent(
    @Param('postId') postId: string,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const attachment = await this.attachmentsService.findOne(postId, id);

    // Check if file exists
    if (!fs.existsSync(attachment.path)) {
      throw new BadRequestException('File not found on server');
    }

    // Set content type based on attachment's mimetype
    res.setHeader('Content-Type', attachment.mimetype);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${attachment.originalname}"`,
    );

    // Stream the file to the response
    const fileStream = fs.createReadStream(attachment.path);
    fileStream.pipe(res);
  }
}
