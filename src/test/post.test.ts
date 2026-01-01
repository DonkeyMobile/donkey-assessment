import request from "supertest";
import app from "../app.js";
import { testIds } from "./setup.js";
import mongoose from "mongoose";
import Post from "../models/Post.js";

describe("Post controller integration tests", () => {
  describe("Post /api/posts createPost", () => {
    test("Should create a post and return 201", async () => {
      const post = { description: "This is a test post" };

      const res = await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${testIds.userId}`)
        .send(post);

      expect(res.statusCode).toBe(201);
      expect(res.body.description).toBe(post.description);
      expect(res.body.author).toBe(testIds.userId);
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");

      // Verify that it was created in the db
      const exists = await Post.exists({ _id: res.body._id });
      expect(exists).toBeTruthy();
    });

    test("Should return 400 if body missing", async () => {
      const res = await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${testIds.userId}`);

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Missing fields");
    });

    test("Should return 400 if a field is missing", async () => {
      const incompletePost = {};

      const res = await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${testIds.userId}`)
        .send(incompletePost);

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Missing fields");
    });

    test("Should return 400 if the description is to long", async () => {
      const longPost = {
        description: "a".repeat(501),
      };

      const res = await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${testIds.userId}`)
        .send(longPost);

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe(
        "Post validation failed: description: Post cannot exceed 500 characters"
      );
    });
  });

  describe("Get /api/posts/:postId getPost", () => {
    test("Should return a post with author and description and have a date", async () => {
      const res = await request(app).get(`/api/posts/${testIds.postId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(testIds.postId);
      expect(res.body.description).toBe("Sample description");
      expect(res.body.author.firstName).toBe("Test");
      expect(res.body.author.lastName).toBe("Name");
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");
    });

    test("Should return 404 for a non-existent post", async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).get(`/api/posts/${fakeId}`);

      expect(res.statusCode).toBe(404);
      expect(res.text).toBe("Post was not found");
    });

    test("Should return 400 for an invalid Id format", async () => {
      const res = await request(app).get("/api/posts/invalid");

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Invalid Id");
    });
  });

  describe("Delete /api/posts/:postId deleteComment", () => {
    test("Should delete the post and return 200", async () => {
      const res = await request(app)
        .delete(`/api/posts/${testIds.postId}`)
        .set("Authorization", `Bearer ${testIds.userId}`);

      expect(res.statusCode).toBe(200);

      // Verify that it was deleted
      const exists = await Post.findById(testIds.postId);
      expect(exists).toBeNull();
    });

    test("Should return 404 for a non-existent post", async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).delete(`/api/posts/${fakeId}`);

      expect(res.statusCode).toBe(404);
      expect(res.text).toBe("Post was not found");
    });

    test("Should return 400 for an invalid Id format", async () => {
      const res = await request(app).delete("/api/posts/invalid");

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Invalid Id");
    });
  });
});
