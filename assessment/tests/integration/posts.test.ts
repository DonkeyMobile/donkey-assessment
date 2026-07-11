import request from "supertest";
import { createApp } from "../../src/app";
import { connect, closeDatabase, clearDatabase } from "../utils/testDb";

const app = createApp();

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe("Posts API", () => {
  it("creates a post", async () => {
    const res = await request(app)
      .post("/api/posts")
      .send({ date: "2024-01-01", description: "My first post" });

    expect(res.status).toBe(201);
    expect(res.body.description).toBe("My first post");
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await request(app).post("/api/posts").send({});
    expect(res.status).toBe(400);
  });

  it("lists posts", async () => {
    await request(app).post("/api/posts").send({ date: "2024-01-01", description: "Post A" });
    await request(app).post("/api/posts").send({ date: "2024-01-02", description: "Post B" });

    const res = await request(app).get("/api/posts");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it("gets a post by id", async () => {
    const created = await request(app)
      .post("/api/posts")
      .send({ date: "2024-01-01", description: "Post A" });

    const res = await request(app).get(`/api/posts/${created.body._id}`);
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(created.body._id);
  });

  it("returns 404 for missing post", async () => {
    const res = await request(app).get("/api/posts/64b6f0f0f0f0f0f0f0f0f0f0");
    expect(res.status).toBe(404);
  });

  it("updates a post", async () => {
    const created = await request(app)
      .post("/api/posts")
      .send({ date: "2024-01-01", description: "Original" });

    const res = await request(app)
      .put(`/api/posts/${created.body._id}`)
      .send({ description: "Updated" });

    expect(res.status).toBe(200);
    expect(res.body.description).toBe("Updated");
  });

  it("deletes a post", async () => {
    const created = await request(app)
      .post("/api/posts")
      .send({ date: "2024-01-01", description: "To delete" });

    const res = await request(app).delete(`/api/posts/${created.body._id}`);
    expect(res.status).toBe(204);

    const getRes = await request(app).get(`/api/posts/${created.body._id}`);
    expect(getRes.status).toBe(404);
  });
});

describe("Comments API", () => {
  it("creates a comment on a post", async () => {
    const post = await request(app)
      .post("/api/posts")
      .send({ date: "2024-01-01", description: "Post with comments" });

    const res = await request(app)
      .post(`/api/posts/${post.body._id}/comments`)
      .send({ description: "Nice post!", author: "Alice" });

    expect(res.status).toBe(201);
    expect(res.body.description).toBe("Nice post!");
  });

  it("lists comments for a post", async () => {
    const post = await request(app)
      .post("/api/posts")
      .send({ date: "2024-01-01", description: "Post with comments" });

    await request(app)
      .post(`/api/posts/${post.body._id}/comments`)
      .send({ description: "Comment 1", author: "Alice" });
    await request(app)
      .post(`/api/posts/${post.body._id}/comments`)
      .send({ description: "Comment 2", author: "Bob" });

    const res = await request(app).get(`/api/posts/${post.body._id}/comments`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it("deletes a comment", async () => {
    const post = await request(app)
      .post("/api/posts")
      .send({ date: "2024-01-01", description: "Post with comments" });

    const comment = await request(app)
      .post(`/api/posts/${post.body._id}/comments`)
      .send({ description: "To delete", author: "Alice" });

    const res = await request(app).delete(`/api/posts/${post.body._id}/comments/${comment.body._id}`);
    expect(res.status).toBe(204);
  });
});
