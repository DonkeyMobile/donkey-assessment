import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { CommentsService } from './comments.service';

export class CreateCommentDto {
  content: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(postId, createCommentDto);
  }

  @Get()
  async findAll(@Param('postId') postId: string) {
    return this.commentsService.findAll(postId);
  }

  @Get(':id')
  async findOne(@Param('postId') postId: string, @Param('id') id: string) {
    return this.commentsService.findOne(postId, id);
  }

  @Patch(':id')
  async update(
    @Param('postId') postId: string,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(postId, id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('postId') postId: string, @Param('id') id: string) {
    return this.commentsService.remove(postId, id);
  }
}
