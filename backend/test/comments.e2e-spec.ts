import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  CreateCommentDto,
  UpdateCommentDto,
} from '../src/comments/comments.controller';
import { CreatePostDto } from '../src/posts/posts.controller';

describe('CommentsController (e2e)', () => {
  let app: INestApplication;
  let createdPostId: string;
  let createdCommentId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Create a post to test comments on
    const createPostDto: CreatePostDto = {
      description: 'Test post for comments',
    };

    const postResponse = await request(app.getHttpServer())
      .post('/posts')
      .send(createPostDto)
      .expect(201);

    createdPostId = postResponse.body.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a comment', () => {
    const createCommentDto: CreateCommentDto = {
      content: 'Test comment content',
    };

    return request(app.getHttpServer())
      .post(`/posts/${createdPostId}/comments`)
      .send(createCommentDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('dateTime');
        expect(res.body.content).toBe(createCommentDto.content);
        createdCommentId = res.body.id;
      });
  });

  it('should get all comments for a post', () => {
    return request(app.getHttpServer())
      .get(`/posts/${createdPostId}/comments`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('should get a comment by id', () => {
    return request(app.getHttpServer())
      .get(`/posts/${createdPostId}/comments/${createdCommentId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', createdCommentId);
        expect(res.body).toHaveProperty('content');
      });
  });

  it('should update a comment', () => {
    const updateCommentDto: UpdateCommentDto = {
      content: 'Updated test comment content',
    };

    return request(app.getHttpServer())
      .patch(`/posts/${createdPostId}/comments/${createdCommentId}`)
      .send(updateCommentDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', createdCommentId);
        expect(res.body.content).toBe(updateCommentDto.content);
      });
  });

  it('should delete a comment', () => {
    return request(app.getHttpServer())
      .delete(`/posts/${createdPostId}/comments/${createdCommentId}`)
      .expect(200);
  });

  it('should not find the deleted comment', () => {
    return request(app.getHttpServer())
      .get(`/posts/${createdPostId}/comments/${createdCommentId}`)
      .expect(404);
  });
});
