import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreatePostDto, UpdatePostDto } from '../src/posts/posts.controller';

describe('PostsController (e2e)', () => {
  let app: INestApplication;
  let createdPostId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a post', () => {
    const createPostDto: CreatePostDto = {
      description: 'Test post description',
    };

    return request(app.getHttpServer())
      .post('/posts')
      .send(createPostDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('dateTime');
        expect(res.body.description).toBe(createPostDto.description);
        createdPostId = res.body.id;
      });
  });

  it('should get all posts', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
      });
  });

  it('should get a post by id', () => {
    return request(app.getHttpServer())
      .get(`/posts/${createdPostId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', createdPostId);
        expect(res.body).toHaveProperty('description');
      });
  });

  it('should update a post', () => {
    const updatePostDto: UpdatePostDto = {
      description: 'Updated test post description',
    };

    return request(app.getHttpServer())
      .patch(`/posts/${createdPostId}`)
      .send(updatePostDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', createdPostId);
        expect(res.body.description).toBe(updatePostDto.description);
      });
  });

  it('should delete a post', () => {
    return request(app.getHttpServer())
      .delete(`/posts/${createdPostId}`)
      .expect(200);
  });

  it('should not find the deleted post', () => {
    return request(app.getHttpServer())
      .get(`/posts/${createdPostId}`)
      .expect(404);
  });
});
