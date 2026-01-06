import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { rmSync } from "fs";

let mongod: MongoMemoryServer;
export const testIds = {
  userId: "",
  user2Id: "",
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
  // clean up upload dir
  const tempdir = process.env.UPLOAD_DIR;
  if (tempdir) {
    rmSync(tempdir, { recursive: true, force: true });
  }
});

// Creating test data for every test
beforeEach(async () => {
  await mongoose.connection.dropDatabase();
  const user = await User.create({
    firstName: "Test",
    lastName: "Name",
    email: "test@example.com",
  });
  testIds.userId = user._id.toString();
  const user2 = await User.create({
    firstName: "Test",
    lastName: "Name",
    email: "test2@example.com",
  });
  testIds.user2Id = user2._id.toString();
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
