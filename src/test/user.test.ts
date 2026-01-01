import request from "supertest";
import app from "../app.js";
import { testIds } from "./setup.js";
import User from "../models/User.js";

describe("User controller integration tests", () => {
  describe("Post /api/users createUser", () => {
    test("Should create a new user and return 201", async () => {
      const newUser = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
      };

      const res = await request(app).post("/api/users").send(newUser);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("_id");
      expect(res.body.email).toBe(newUser.email);
      expect(res.body.firstName).toBe(newUser.firstName);
      expect(res.body.lastName).toBe(newUser.lastName);

      // Verify that it was created in the db
      const exists = await User.exists({ _id: res.body._id });
      expect(exists).toBeTruthy();
    });

    test("should return 400 if body missing", async () => {
      const res = await request(app).post("/api/users");

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Missing fields");
    });

    test("Should return 400 if a field is missing", async () => {
      const incompleteUser = {
        firstName: "John",
      };

      const res = await request(app).post("/api/users").send(incompleteUser);

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Missing fields");
    });

    test("Should return 400 if the email is not valid", async () => {
      const invalidEmailUser = {
        firstName: "John",
        lastName: "Doe",
        email: "invalidEmail",
      };

      const res = await request(app).post("/api/users").send(invalidEmailUser);

      expect(res.statusCode).toBe(400);
      expect(res.text).toBe(
        "User validation failed: email: Please use a valid email address"
      );
    });

    test("Should return 409 if the email is already in use", async () => {
      // Using the same email as in the test user
      const duplicateUser = {
        firstName: "John",
        lastName: "Doe",
        email: "test@example.com",
      };

      const res = await request(app).post("/api/users").send(duplicateUser);

      expect(res.statusCode).toBe(409);
      expect(res.text).toBe("Email already in use");
    });
  });

  describe("Delete /api/users deleteUser", () => {
    test("Should delete the authenticated user and return 200", async () => {
      const res = await request(app)
        .delete("/api/users")
        .set("Authorization", `Bearer ${testIds.userId}`);

      expect(res.statusCode).toBe(200);

      const exists = await User.exists({ _id: testIds.userId });
      expect(exists).toBeNull();
    });

    // Can not test if 404 is returned when user does not exist because that cant be reached because of auth
  });
});
