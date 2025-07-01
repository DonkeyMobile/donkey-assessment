import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from '../src/app.module';

import { CreatePostDto } from '../src/posts/posts.controller';

describe('AttachmentsController (e2e)', () => {
  let app: INestApplication;
  let createdPostId: string;
  let createdAttachmentId: string;

  // Define paths to test images
  const littleChurchPath = path.join(__dirname, 'images', 'little_church.jpg');
  const stPetersPath = path.join(__dirname, 'images', 'st_peters.jpg');

  beforeAll(async () => {
    // Ensure uploads directory exists
    const uploadsDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Create a post to test attachments on
    const createPostDto: CreatePostDto = {
      description: 'Test post for attachments',
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

  it('should upload an attachment to a post', () => {
    return request(app.getHttpServer())
      .post(`/posts/${createdPostId}/attachments`)
      .attach('file', littleChurchPath)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('filename');
        expect(res.body).toHaveProperty('originalname');
        expect(res.body).toHaveProperty('mimetype');
        expect(res.body).toHaveProperty('size');
        expect(res.body).toHaveProperty('path');
        expect(res.body).toHaveProperty('uploadDate');
        createdAttachmentId = res.body.id;
      });
  });

  it('should get all attachments for a post', () => {
    return request(app.getHttpServer())
      .get(`/posts/${createdPostId}/attachments`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('filename');
      });
  });

  it('should get an attachment by id', () => {
    return request(app.getHttpServer())
      .get(`/posts/${createdPostId}/attachments/${createdAttachmentId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', createdAttachmentId);
        expect(res.body).toHaveProperty('filename');
        expect(res.body).toHaveProperty('originalname');
        expect(res.body).toHaveProperty('mimetype');
      });
  });

  it('should upload a second attachment to the post', () => {
    return request(app.getHttpServer())
      .post(`/posts/${createdPostId}/attachments`)
      .attach('file', stPetersPath)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('filename');
      });
  });

  it('should verify post has both attachments', () => {
    return request(app.getHttpServer())
      .get(`/posts/${createdPostId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id', createdPostId);
        expect(res.body.attachments).toBeDefined();
        expect(res.body.attachments.length).toBe(2);
      });
  });

  it('should delete an attachment', () => {
    return request(app.getHttpServer())
      .delete(`/posts/${createdPostId}/attachments/${createdAttachmentId}`)
      .expect(200);
  });

  it('should verify attachment was deleted', () => {
    return request(app.getHttpServer())
      .get(`/posts/${createdPostId}/attachments`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(
          res.body.find((a) => a.id === createdAttachmentId),
        ).toBeUndefined();
      });
  });

  it('should not find the deleted attachment', () => {
    return request(app.getHttpServer())
      .get(`/posts/${createdPostId}/attachments/${createdAttachmentId}`)
      .expect(404);
  });

  it('should fail when trying to upload without a file', () => {
    return request(app.getHttpServer())
      .post(`/posts/${createdPostId}/attachments`)
      .expect(400);
  });

  // Test for checking if attachments are removed when a post is deleted
  describe('Post deletion with attachments', () => {
    let postWithAttachmentsId: string;
    let attachmentIds: string[] = [];

    it('should create a new post for attachment deletion test', async () => {
      const createPostDto: CreatePostDto = {
        description: 'Test post for attachment deletion test',
      };

      const response = await request(app.getHttpServer())
        .post('/posts')
        .send(createPostDto)
        .expect(201);

      postWithAttachmentsId = response.body.id;
      expect(postWithAttachmentsId).toBeDefined();
    });

    it('should upload multiple attachments to the post', async () => {
      // Upload first attachment
      const response1 = await request(app.getHttpServer())
        .post(`/posts/${postWithAttachmentsId}/attachments`)
        .attach('file', littleChurchPath)
        .expect(201);

      attachmentIds.push(response1.body.id);

      // Upload second attachment
      const response2 = await request(app.getHttpServer())
        .post(`/posts/${postWithAttachmentsId}/attachments`)
        .attach('file', stPetersPath)
        .expect(201);

      attachmentIds.push(response2.body.id);

      // Verify post has both attachments
      await request(app.getHttpServer())
        .get(`/posts/${postWithAttachmentsId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.attachments).toBeDefined();
          expect(res.body.attachments.length).toBe(2);
        });
    });

    it('should delete the post with attachments', async () => {
      await request(app.getHttpServer())
        .delete(`/posts/${postWithAttachmentsId}`)
        .expect(200);

      // Verify post is deleted
      await request(app.getHttpServer())
        .get(`/posts/${postWithAttachmentsId}`)
        .expect(404);
    });

    it('should not be able to access attachments after post deletion', async () => {
      // Try to get all attachments for the deleted post
      await request(app.getHttpServer())
        .get(`/posts/${postWithAttachmentsId}/attachments`)
        .expect(404);

      // Try to get individual attachments
      for (const attachmentId of attachmentIds) {
        await request(app.getHttpServer())
          .get(`/posts/${postWithAttachmentsId}/attachments/${attachmentId}`)
          .expect(404);
      }
    });
  });
});
