import request from "supertest";
import app from "../app.js";
import { testIds } from "./setup.js";
import mongoose from "mongoose";
import Comment from "../models/Comment.js";

describe("Comment controller integration tests", () => {
  describe("Post /api/posts/:postId/comments createComment", () => {
    test("Should create a comment and return 201", async () => {
      const comment = { comment: "This is a test comment" };

      const res = await request(app)
        .post(`/api/posts/${testIds.postId}/comments`)
        .set("Authorization", `Bearer ${testIds.userId}`)
        .send(comment);

      expect(res.statusCode).toBe(201);
      expect(res.body.comment).toBe(comment.comment);
      expect(res.body.author).toBe(testIds.userId);
      expect(res.body.post).toBe(testIds.postId);
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");

      // Verify that it was created in the db
      const exists = await Comment.exists({ _id: res.body._id });
      expect(exists).toBeTruthy();
    });

    test("Should return 400 if body missing", async () => {
      const res = await request(app)
        .post(`/api/posts/${testIds.postId}/comments`)
        .set("Authorization", `Bearer ${testIds.userId}`);

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Missing fields");
    });

    test("Should return 400 if a field is missing", async () => {
      const incompleteComment = {};

      const res = await request(app)
        .post(`/api/posts/${testIds.postId}/comments`)
        .set("Authorization", `Bearer ${testIds.userId}`)
        .send(incompleteComment);

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Missing fields");
    });

    test("Should return 400 if the comment is to long", async () => {
      const longComment = {
        comment: "a".repeat(101),
      };

      const res = await request(app)
        .post(`/api/posts/${testIds.postId}/comments`)
        .set("Authorization", `Bearer ${testIds.userId}`)
        .send(longComment);

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe(
        "Comment validation failed: comment: Comment cannot exceed 100 characters"
      );
    });
  });

  describe("Get /api/posts/:postId/comments getCommentsByPost", () => {
    test("Should return the comments on a post with author and comment and have a date", async () => {
      const res = await request(app).get(
        `/api/posts/${testIds.postId}/comments`
      );

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
      expect(res.body[0].comment).toBe("Sample comment");
      expect(res.body[0].author.firstName).toBe("Test");
      expect(res.body[0].author.lastName).toBe("Name");
      expect(res.body[0]).toHaveProperty("createdAt");
      expect(res.body[0]).toHaveProperty("updatedAt");
    });

    test("Should return 404 for a non-existent post", async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).get(`/api/posts/${fakeId}/comments`);

      expect(res.statusCode).toBe(404);
      expect(res.text).toBe("Post was not found");
    });

    test("Should return 400 for an invalid Id format", async () => {
      const res = await request(app).get("/api/posts/invalid/comments");

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Invalid Id");
    });
  });

  describe("Delete /api/posts/:postId/comments/:commentId deleteComment", () => {
    test("Should delete the comment and return 200", async () => {
      const res = await request(app)
        .delete(`/api/posts/${testIds.postId}/comments/${testIds.commentId}`)
        .set("Authorization", `Bearer ${testIds.userId}`);

      expect(res.statusCode).toBe(200);

      // Verify that it was deleted
      const exists = await Comment.findById(testIds.commentId);
      expect(exists).toBeNull();
    });

    test("Should return 404 for a non-existent comment", async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).delete(
        `/api/posts/${testIds.postId}/comments/${fakeId}`
      );

      expect(res.statusCode).toBe(404);
      expect(res.text).toBe("Comment was not found");
    });

    test("Should return 400 for an invalid Id format", async () => {
      const res = await request(app).delete(
        `/api/posts/${testIds.postId}/comments/invalid`
      );

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Invalid Id");
    });

    test("Should delete the comment when the post is deleted", async () => {
      const res = await request(app)
        .delete(`/api/posts/${testIds.postId}`)
        .set("Authorization", `Bearer ${testIds.userId}`);

      expect(res.statusCode).toBe(200);

      // Verify that it was deleted
      const exists = await Comment.findById(testIds.commentId);
      expect(exists).toBeNull();
    });
  });
});
