import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";
import User from "../models/User";
import Post from "../models/Post";
import Attachment from "../models/Attachment";

let mongoServer: MongoMemoryServer;
let userId: string;
let postId: string;
let attachmentId: string;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log(`✅ MongoMemoryServer connected at: ${uri}`);
});

// Clean up database after each test
afterEach(async () => {
    await Attachment.deleteMany();
    await Post.deleteMany();
    await User.deleteMany();
});

// Close database connection after all tests
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("AttachmentController", () => {

    /** Create a user and a post first, since attachments require a valid post ID */
    beforeEach(async () => {
        const userResponse = await request(app)
            .post("/api/users")
            .send({ name: "Test User", email: "test@example.com" });

        expect(userResponse.status).toBe(201);
        userId = userResponse.body._id;

        const postResponse = await request(app)
            .post("/api/posts")
            .send({ description: "Test Post", user: userId });

        expect(postResponse.status).toBe(201);
        postId = postResponse.body._id;
    });

    /** Test Creating an Attachment */
    it("should create a new attachment", async () => {
        const response = await request(app)
            .post("/api/attachment")
            .send({ type: "image/png", filePath: "/uploads/test.png", post: postId });

        expect(response.status).toBe(201);
        expect(response.body.type).toBe("image/png");
        expect(response.body.filePath).toBe("/uploads/test.png");
        expect(response.body.post).toBe(postId);

        attachmentId = response.body._id; // Save for later tests
    });

    /** Test Fetching All Attachments for a Post */
    it("should fetch all attachments for a post", async () => {
        await request(app).post("/api/attachment").send({ type: "image/jpeg", filePath: "/uploads/test1.jpg", post: postId });
        await request(app).post("/api/attachment").send({ type: "image/png", filePath: "/uploads/test2.png", post: postId });

        const response = await request(app).get(`/api/attachment/${postId}/ByPost`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
    });

    /** Test Fetching a Single Attachment by ID */
    it("should fetch a single attachment by ID", async () => {
        const createResponse = await request(app)
            .post("/api/attachment")
            .send({ type: "image/jpeg", filePath: "/uploads/fetch.jpg", post: postId });

        const newAttachmentId = createResponse.body._id;

        const response = await request(app).get(`/api/attachment/${newAttachmentId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(newAttachmentId);
    });

    /** Test Updating an Attachment */
    it("should update an attachment", async () => {
        const createResponse = await request(app)
            .post("/api/attachment")
            .send({ type: "image/png", filePath: "/uploads/old.png", post: postId });

        const newAttachmentId = createResponse.body._id;

        const response = await request(app)
            .put(`/api/attachment/${newAttachmentId}`)
            .send({ filePath: "/uploads/new.png" });

        expect(response.status).toBe(200);
        expect(response.body.filePath).toBe("/uploads/new.png");
    });

    /** Test Deleting an Attachment */
    it("should delete an attachment", async () => {
        const createResponse = await request(app)
            .post("/api/attachment")
            .send({ type: "image/png", filePath: "/uploads/delete.png", post: postId });

        const newAttachmentId = createResponse.body._id;

        const response = await request(app).delete(`/api/attachment/${newAttachmentId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Attachment deleted successfully");

        // Ensure attachment no longer exists
        const checkResponse = await request(app).get(`/api/attachment/${newAttachmentId}`);
        expect(checkResponse.status).toBe(404);
    });

    /** Test that Deleting a Post Deletes All its Attachments */
    it("should delete all attachments when a post is deleted", async () => {
        await request(app).post("/api/attachment").send({ type: "image/png", filePath: "/uploads/test1.png", post: postId });
        await request(app).post("/api/attachment").send({ type: "image/jpeg", filePath: "/uploads/test2.jpg", post: postId });

        // Delete the post
        const deleteResponse = await request(app).delete(`/api/posts/${postId}`);
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body.message).toBe("Post deleted successfully");

        // Ensure attachments are deleted
        const checkResponse = await request(app).get(`/api/attachment/${postId}/ByPost`);
        expect(checkResponse.status).toBe(404);
    });
});
