import {router} from "../routes.config";
import PostController from '../controllers/post.controller';
import supertest from "supertest";
import express from "express";

const app = express();
app.use(router);

jest.mock("../controllers/post.controller", () => {
  return {
    PostController: jest.fn().mockImplementation(() => {
      return {
        getList: function () {
        },
        getPost: function () {
        },
        createPost: function () {
        },
        updatePost: function () {
        },
        deletePost: function () {
        },
      };
    })
  };
});

describe("Validate routes", () => {
  describe("Post routes", () => {

    test("route get all posts", async () => {
      const spiedMethod = jest.spyOn(PostController, "getList");
      await supertest(app).get("/posts");
      expect(spiedMethod).toHaveBeenCalled();
    })
  })
})
