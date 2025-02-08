import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";
import User from "../models/User";
import Post from "../models/Post";
import Comment from "../models/Comment";

let mongoServer: MongoMemoryServer;
let userId: string;
let postId: string;
let commentId: string;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log(`✅ MongoMemoryServer connected at: ${uri}`);
});

// Clean up database after each test
afterEach(async () => {
    await Comment.deleteMany();
    await Post.deleteMany();
    await User.deleteMany();
});

// Close database connection after all tests
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("CommentController", () => {

    /** Create a user and a post first, since comments require valid IDs */
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

    /** Test Creating a Comment */
    it("should create a new comment", async () => {
        const response = await request(app)
            .post("/api/comments")
            .send({ text: "This is a test comment", user: userId, post: postId });

        expect(response.status).toBe(201);
        expect(response.body.text).toBe("This is a test comment");
        expect(response.body.user).toBe(userId);
        expect(response.body.post).toBe(postId);

        commentId = response.body._id; // Save for later tests
    });

    /** Test Fetching All Comments for a Post */
    it("should fetch all comments for a post", async () => {
        await request(app).post("/api/comments").send({ text: "Comment 1", user: userId, post: postId });
        await request(app).post("/api/comments").send({ text: "Comment 2", user: userId, post: postId });

        const response = await request(app).get(`/api/comments/${postId}/ByPost`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
    });

    /** Test Fetching All Comments by a User */
    it("should fetch all comments by a specific user", async () => {
        await request(app).post("/api/comments").send({ text: "User Comment 1", user: userId, post: postId });
        await request(app).post("/api/comments").send({ text: "User Comment 2", user: userId, post: postId });

        const response = await request(app).get(`/api/comments/${userId}/ByUser`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
    });

    /** Test Fetching a Comment by ID */
    it("should fetch a comment by ID", async () => {
        const createResponse = await request(app)
            .post("/api/comments")
            .send({ text: "Comment for fetch test", user: userId, post: postId });

        const newCommentId = createResponse.body._id;

        const response = await request(app).get(`/api/comments/${newCommentId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(newCommentId);
    });

    /** Test Updating a Comment */
    it("should update a comment", async () => {
        const createResponse = await request(app)
            .post("/api/comments")
            .send({ text: "Old Comment Text", user: userId, post: postId });

        const newCommentId = createResponse.body._id;

        const response = await request(app)
            .put(`/api/comments/${newCommentId}`)
            .send({ text: "Updated Comment Text" });

        expect(response.status).toBe(200);
        expect(response.body.text).toBe("Updated Comment Text");
    });

    /** Test Deleting a Comment */
    it("should delete a comment", async () => {
        const createResponse = await request(app)
            .post("/api/comments")
            .send({ text: "Comment to delete", user: userId, post: postId });

        const newCommentId = createResponse.body._id;

        const response = await request(app).delete(`/api/comments/${newCommentId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Comment deleted successfully");

        // Ensure comment no longer exists
        const checkResponse = await request(app).get(`/api/comments/${newCommentId}`);
        expect(checkResponse.status).toBe(404);
    });
});
