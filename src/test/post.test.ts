import request from "supertest";
import app from "../app.js";
import { testIds } from "./setup.js";
import mongoose from "mongoose";
import Post from "../models/Post.js";
import { resolve } from "path";

describe("Post controller integration tests", () => {
  describe("Post /api/posts createPost", () => {
    test("Should create a post and return 201", async () => {
      const description = "This is a test post";

      const res = await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${testIds.userId}`)
        .field("description", description);

      expect(res.statusCode).toBe(201);
      expect(res.body.description).toBe(description);
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

    test("Should return 400 if the description is too long", async () => {
      const description = "a".repeat(501);

      const res = await request(app)
        .post("/api/posts")
        .set("Authorization", `Bearer ${testIds.userId}`)
        .field("description", description);

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe(
        "Post validation failed: description: Post cannot exceed 500 characters"
      );
    });

    describe("File uploads", () => {
      test("Should create a post with a document and 2 images and return 201", async () => {
        const description = "This is a test post";

        const res = await request(app)
          .post("/api/posts")
          .set("Authorization", `Bearer ${testIds.userId}`)
          .field("description", description)
          .attach("document", resolve("./test-data/document.pdf"))
          .attach("images", resolve("./test-data/image1.png"))
          .attach("images", resolve("./test-data/image2.webp"));

        expect(res.statusCode).toBe(201);
        expect(res.body.description).toBe(description);
        expect(res.body.author).toBe(testIds.userId);
        expect(res.body).toHaveProperty("createdAt");
        expect(res.body).toHaveProperty("updatedAt");
        expect(res.body.document).toHaveProperty("fileName");
        expect(res.body.document).toHaveProperty("fileType");
        expect(res.body.document).toHaveProperty("path");
        expect(res.body.images[0]).toHaveProperty("fileName");
        expect(res.body.images[0]).toHaveProperty("fileType");
        expect(res.body.images[0]).toHaveProperty("path");
        expect(res.body.images[1]).toHaveProperty("fileName");
        expect(res.body.images[1]).toHaveProperty("fileType");
        expect(res.body.images[1]).toHaveProperty("path");

        // Verify that it was created in the db
        const exists = await Post.exists({ _id: res.body._id });
        expect(exists).toBeTruthy();
      });

      test("Should return 400 if too many documents are uploaded", async () => {
        const description = "This is a test post";

        const res = await request(app)
          .post("/api/posts")
          .set("Authorization", `Bearer ${testIds.userId}`)
          .field("description", description)
          .attach("document", resolve("./test-data/document.pdf"))
          .attach("document", resolve("./test-data/document.pdf"));

        expect(res.statusCode).toBe(400);
      });

      test("Should return 400 if wrong image type is uploaded", async () => {
        const description = "This is a test post";

        const res = await request(app)
          .post("/api/posts")
          .set("Authorization", `Bearer ${testIds.userId}`)
          .field("description", description)
          .attach("images", resolve("./test-data/document.pdf"));

        expect(res.statusCode).toBe(400);
      });
    });
  });

  describe("Patch /api/posts updatePost", () => {
    test("Should update a post and return 200", async () => {
      const post = { description: "This is a updated Post!" };

      const res = await request(app)
        .patch(`/api/posts/${testIds.postId}`)
        .set("Authorization", `Bearer ${testIds.userId}`)
        .send(post);

      expect(res.statusCode).toBe(200);
      expect(res.body.description).toBe(post.description);
      expect(res.body.author).toBe(testIds.userId);
      expect(res.body).toHaveProperty("createdAt");
      expect(res.body).toHaveProperty("updatedAt");

      // Verify that it was update
      expect(res.body.createdAt).not.toBe(res.body.updatedAt);
    });

    test("Should return 400 if body missing", async () => {
      const res = await request(app)
        .patch(`/api/posts/${testIds.postId}`)
        .set("Authorization", `Bearer ${testIds.userId}`);

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Missing fields");
    });

    test("Should return 400 if a field is missing", async () => {
      const incompletePost = {};

      const res = await request(app)
        .patch(`/api/posts/${testIds.postId}`)
        .set("Authorization", `Bearer ${testIds.userId}`)
        .send(incompletePost);

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Missing fields");
    });

    test("Should return 400 if the description is too long", async () => {
      const longPost = {
        description: "a".repeat(501),
      };

      const res = await request(app)
        .patch(`/api/posts/${testIds.postId}`)
        .set("Authorization", `Bearer ${testIds.userId}`)
        .send(longPost);

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe(
        "Validation failed: description: Post cannot exceed 500 characters"
      );
    });

    test("Should return 404 for a non-existent post", async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).patch(`/api/posts/${fakeId}`);

      expect(res.statusCode).toBe(404);
      expect(res.text).toBe("Post was not found");
    });

    test("Should return 403 when editing a other users post", async () => {
      const post = { description: "This is a updated Post!" };

      const res = await request(app)
        .patch(`/api/posts/${testIds.postId}`)
        .set("Authorization", `Bearer ${testIds.user2Id}`)
        .send(post);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("You are not allowed to update this post");
    });
  });

  describe("Get /api/posts/:postId getPost", () => {
    test("Should return a post with author and description and have a date", async () => {
      const res = await request(app).get(`/api/posts/${testIds.postId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body._id).toBe(testIds.postId);
      expect(res.body.description).toBe("Sample description");
      expect(res.body.commentCount).toBe(1);
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

  describe("Delete /api/posts/:postId deletePost", () => {
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

    test("Should return 403 when deleting using a other user", async () => {
      const res = await request(app)
        .delete(`/api/posts/${testIds.postId}`)
        .set("Authorization", `Bearer ${testIds.user2Id}`);

      expect(res.statusCode).toBe(403);
      expect(res.text).toBe("You are not allowed to delete this post");
    });
  });

  describe("Get /api/posts getPosts", () => {
    beforeEach(async () => {
      await Post.findByIdAndDelete(testIds.postId);

      const sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));

      for (let index = 0; index < 60; index++) {
        await Post.create({
          description: index.toString(),
          author: testIds.userId,
        });
        // sleep so that the order is correct
        await sleep(10);
      }
    });

    test("Should return the first 20 post in the correct order", async () => {
      const res = await request(app).get(`/api/posts`);

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(20);

      res.body.forEach(
        (
          post: {
            description: string;
            createdAt: string | number | Date;
          },
          index: number
        ) => {
          if (index > 0) {
            const currentOrderTime = new Date(post.createdAt).getTime();
            const previousOrderTime = new Date(
              res.body[index - 1].createdAt
            ).getTime();

            expect(currentOrderTime).toBeLessThanOrEqual(previousOrderTime);
          }
          expect(post.description).toBe((59 - index).toString());
        }
      );
    });

    const countTest = [
      { limit: "20", count: 20 },
      { limit: "30", count: 30 },
      { limit: "10", count: 10 },
      { limit: "0", count: 20 },
      { limit: "60", count: 20 },
      { limit: "test", count: 20 },
      { limit: "-4", count: 20 },
    ];

    test.each(countTest)(
      "Should return $count for the limit of $limit",
      async ({ limit, count }) => {
        const res = await request(app).get(`/api/posts?limit=${limit}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(count);
      }
    );

    const pageTest = [
      { page: "0", firstDescription: "59" },
      { page: "1", firstDescription: "57" },
      { page: "-1", firstDescription: "59" },
      { page: "test", firstDescription: "59" },
    ];

    test.each(pageTest)(
      "Should return the first description $firstDescription for the page $page",
      async ({ page, firstDescription }) => {
        const res = await request(app).get(`/api/posts?limit=2&page=${page}`);

        expect(res.statusCode).toBe(200);
        expect(res.body[0].description).toBe(firstDescription);
      }
    );
  });
});
