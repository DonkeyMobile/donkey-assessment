import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User, { type IUser } from "../models/User.js";
import type { IPost } from "../models/Post.js";
import type { IComment } from "../models/Comment.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

let mongod: MongoMemoryServer;
export const testIds = {
  userId: "",
  postId: "",
  commentId: "",
};

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
  const user = await User.create({
    firstName: "Test",
    lastName: "Name",
    email: "test@example.com",
  });
  testIds.userId = user._id.toString();
  const post = await Post.create({
    description: "Sample description",
    author: testIds.userId,
  });
  testIds.postId = post._id.toString();
  const comment = await Comment.create({
    comment: "Sample comment",
    author: testIds.userId,
    post: testIds.postId,
  });
  testIds.commentId = comment._id.toString();
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
});
