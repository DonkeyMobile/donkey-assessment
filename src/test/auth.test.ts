import request from "supertest";
import app from "../app.js";
import { testIds } from "./setup.js";
import mongoose from "mongoose";

describe("Authentication Integration Tests", () => {
  // All routes that are protected
  const protectedRoutes = [
    { method: "delete", url: "/api/users" },
    { method: "post", url: "/api/posts" },
    { method: "delete", url: "/api/posts/${postId}" },
    { method: "post", url: "/api/posts/${postId}/comments" },
    {
      method: "delete",
      url: "/api/posts/${postId}/comments/${commentId}",
    },
  ];

  test.each(protectedRoutes)(
    "should return 401 if Authorization header is missing on $method $url",
    async ({ method, url }) => {
      const agent = request(app) as any;
      const processedUrl = url
        .replaceAll("${postId}", testIds.postId)
        .replaceAll("${commentId}", testIds.commentId);
      const res = await agent[method](processedUrl);

      expect(res.statusCode).toBe(401);
      expect(res.text).toBe("Please login");
    }
  );

  test.each(protectedRoutes)(
    "should return 401 if Authorization header is invalid on $method $url",
    async ({ method, url }) => {
      const agent = request(app) as any;
      const processedUrl = url
        .replaceAll("${postId}", testIds.postId)
        .replaceAll("${commentId}", testIds.commentId);
      const res = await agent[method](processedUrl).set(
        "Authorization",
        "Basic invalid-format"
      );

      expect(res.statusCode).toBe(401);
      expect(res.text).toBe("Please provide a valid login token");
    }
  );

  test.each(protectedRoutes)(
    "should return 401 if The user does not exist on $method $url",
    async ({ method, url }) => {
      const agent = request(app) as any;
      const processedUrl = url
        .replaceAll("${postId}", testIds.postId)
        .replaceAll("${commentId}", testIds.commentId);
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await agent[method](processedUrl).set(
        "Authorization",
        `Basic ${fakeId}`
      );

      expect(res.statusCode).toBe(401);
      expect(res.text).toBe("Invalid credentials");
    }
  );

  test.each(protectedRoutes)(
    "should not return 401 if The user authenticates on $method $url",
    async ({ method, url }) => {
      const agent = request(app) as any;
      const processedUrl = url
        .replaceAll("${postId}", testIds.postId)
        .replaceAll("${commentId}", testIds.commentId);
      const res = await agent[method](processedUrl).set(
        "Authorization",
        `Basic ${testIds.userId}`
      );

      expect(res.statusCode).not.toBe(401);
    }
  );
});
