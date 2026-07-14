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

  it("creates a post with an attachment", async () => {
    const res = await request(app)
      .post("/api/posts")
      .field("date", "2024-01-01")
      .field("description", "Post with attachment")
      .attach("files", Buffer.from("fake image content"), {
        filename: "photo.png",
        contentType: "image/png",
      });

    expect(res.status).toBe(201);
    expect(res.body.attachments).toHaveLength(1);
    expect(res.body.attachments[0]).toMatchObject({
      fileName: "photo.png",
      type: "photo",
      mimeType: "image/png",
    });
  });

  it("supports multiple attachments of different types", async () => {
    const res = await request(app)
      .post("/api/posts")
      .field("date", "2024-01-01")
      .field("description", "Post with multiple attachments")
      .attach("files", Buffer.from("fake pdf content"), {
        filename: "doc.pdf",
        contentType: "application/pdf",
      })
      .attach("files", Buffer.from("fake video content"), {
        filename: "clip.mp4",
        contentType: "video/mp4",
      });

    expect(res.status).toBe(201);
    expect(res.body.attachments).toHaveLength(2);
    const types = res.body.attachments.map((a: { type: string }) => a.type);
    expect(types).toEqual(expect.arrayContaining(["pdf", "video"]));
  });

  it("skips unsupported attachment types", async () => {
    const res = await request(app)
      .post("/api/posts")
      .field("date", "2024-01-01")
      .field("description", "Post with unsupported attachment")
      .attach("files", Buffer.from("fake content"), {
        filename: "notes.txt",
        contentType: "text/plain",
      });

    expect(res.status).toBe(201);
    expect(res.body.attachments).toHaveLength(0);
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
