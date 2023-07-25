import PostModel from "../src/models/post.model";
import mongoose from "mongoose";

describe("Post Model", () => {
  let savedPostFromJest: any;

  beforeAll(async () => {
    // Connect to local MongoDB instance
    const MONGO_URI =
      "mongodb+srv://dm:D0nk3yMobile2023@donkeymobile.uxtzesu.mongodb.net/donkeymobiletest";

    mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Failed to connect to MongoDB:", error.message);
      });
  });

  afterAll(async () => {
    // Disconnect from the test database
    await PostModel.deleteMany({});
    await mongoose.disconnect();
  });

  it("should create and save a new post", async () => {
    // Create a new post
    const post = new PostModel({
      title: "Title",
      author: "Author",
      content: "Content",
    });

    // Save the post to the database
    const savedPost = await post.save();

    // Check if the user has been saved successfully
    expect(savedPost._id).toBeDefined();
    expect(savedPost.title).toBe("Title");
    expect(savedPost.author).toBe("Author");
    expect(savedPost.content).toBe("Content");
    expect(savedPost.createdAt).toBeDefined();
    expect(savedPost.updatedAt).toBeDefined();
    expect(savedPost.comments).toBeDefined();
    expect(savedPost.attachments).toBeDefined();

    savedPostFromJest = savedPost;
  });

  it("should delete the previous post", async () => {
    // Save the post to the database
    const deletedPost = await PostModel.findByIdAndDelete(
      savedPostFromJest._id
    );

    // Check if the post has been deleted successfully
    expect(deletedPost?._id).toStrictEqual(savedPostFromJest._id);
    expect(deletedPost?.title).toStrictEqual(savedPostFromJest.title);
    expect(deletedPost?.author).toStrictEqual(savedPostFromJest.author);
    expect(deletedPost?.content).toStrictEqual(savedPostFromJest.content);
    expect(deletedPost?.createdAt).toStrictEqual(savedPostFromJest.createdAt);
    expect(deletedPost?.updatedAt).toStrictEqual(savedPostFromJest.updatedAt);
    expect(deletedPost?.comments).toStrictEqual(savedPostFromJest.comments);
    expect(deletedPost?.attachments).toStrictEqual(
      savedPostFromJest.attachments
    );
  });
});
