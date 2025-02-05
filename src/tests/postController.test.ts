import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";
import User from "../models/User";
import Post from "../models/Post";

let mongoServer: MongoMemoryServer;
let userId: string;
let postId: string;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
    console.log(`✅ MongoMemoryServer connected at: ${uri}`);
});

// Clean up database after each test
afterEach(async () => {
    await Post.deleteMany();
    await User.deleteMany();
});

// Close database connection after all tests
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("PostController", () => {

    /** Create a user first, since posts require a valid user */
    beforeEach(async () => {
        const userResponse = await request(app)
            .post("/api/users")
            .send({ name: "Test User", email: "test@example.com" });

        expect(userResponse.status).toBe(201);
        userId = userResponse.body._id;
    });

    /** Test Creating a Post */
    it("should create a new post", async () => {
        const response = await request(app)
            .post("/api/posts")
            .send({ description: "This is a test post", user: userId });

        expect(response.status).toBe(201);
        expect(response.body.description).toBe("This is a test post");
        expect(response.body.user).toBe(userId);

        postId = response.body._id; // Save for later tests
    });

    /** Test Fetching All Posts */
    it("should fetch all posts", async () => {
        await request(app).post("/api/posts").send({ description: "Post 1", user: userId });
        await request(app).post("/api/posts").send({ description: "Post 2", user: userId });

        const response = await request(app).get("/api/posts");
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
    });

    /** Test Fetching a Post by ID */
    it("should fetch a post by ID", async () => {
        const createResponse = await request(app)
            .post("/api/posts")
            .send({ description: "Post for fetch test", user: userId });

        const newPostId = createResponse.body._id;

        const response = await request(app).get(`/api/posts/${newPostId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(newPostId);
    });

    /** Test Fetching Posts by User */
    it("should fetch all posts of a specific user", async () => {
        await request(app).post("/api/posts").send({ description: "User Post 1", user: userId });
        await request(app).post("/api/posts").send({ description: "User Post 2", user: userId });

        const response = await request(app).get(`/api/posts/${userId}/ByUser`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThanOrEqual(2);
    });

    /** Test Updating a Post */
    it("should update a post", async () => {
        const createResponse = await request(app)
            .post("/api/posts")
            .send({ description: "Old Description", user: userId });

        const newPostId = createResponse.body._id;

        const response = await request(app)
            .put(`/api/posts/${newPostId}`)
            .send({ description: "Updated Description" });

        expect(response.status).toBe(200);
        expect(response.body.description).toBe("Updated Description");
    });

    /** Test Deleting a Post */
    it("should delete a post", async () => {
        const createResponse = await request(app)
            .post("/api/posts")
            .send({ description: "Post to delete", user: userId });

        const newPostId = createResponse.body._id;

        const response = await request(app).delete(`/api/posts/${newPostId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Post deleted successfully");

        // Ensure post no longer exists
        const checkResponse = await request(app).get(`/api/posts/${newPostId}`);
        expect(checkResponse.status).toBe(404);
    });
});
