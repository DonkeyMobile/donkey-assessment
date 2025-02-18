import request from "supertest";
import { Express } from "express";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User from "../models/User";
import app from "../app"

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);

    console.log(`✅ MongoMemoryServer connected at: ${uri}`); // Debugging Log
});



afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("UserController", () => {
    let userId: string;

    /** Test User Creation */
    it("should create a new user", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({ name: "John Doe", email: "johndoe@example.com" });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.email).toBe("johndoe@example.com");

        userId = response.body._id;
    });

    /** Test Get All Users */
    it("should fetch all users", async () => {
        const response = await request(app).get("/api/users");
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    /** Test Get Specific User */
    it("should fetch a user by ID", async () => {
        const response = await request(app).get(`/api/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(userId);
    });

    /** Test Updating a User */
    it("should update a user", async () => {
        const response = await request(app)
            .put(`/api/users/${userId}`)
            .send({ name: "Jane Doe" });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Jane Doe");
    });

    /** Test Deleting a User */
    it("should delete a user", async () => {
        const response = await request(app).delete(`/api/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User deleted successfully");

        // Ensure user no longer exists
        const checkResponse = await request(app).get(`/api/users/${userId}`);
        expect(checkResponse.status).toBe(404);
    });
});
