import { create, getWithId } from "../src/services/post.service";
import PostModel from "../src/models/post.model";
import { CustomError } from "../src/utils/customErrorHandling";

jest.mock("../src//models/post.model", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    save: jest.fn().mockResolvedValue({
      _id: "mocked_post_id",
      title: "Title",
      author: "Author",
      content: "Content",
    }),
    getWithId: jest.fn().mockResolvedValue({
      _id: "mocked_post_id",
      title: "Title",
      author: "Author",
      content: "Content",
    }),
  })),
}));

describe("Post Service", () => {
  it("should create a new post", async () => {
    const title = "Title";
    const author = "Author";
    const content = "Content";
    const createdPost = await create(title, author, content);

    expect(PostModel).toHaveBeenCalledTimes(1);
    expect(PostModel).toHaveBeenCalledWith({
      title,
      author,
      content,
    });

    expect(createdPost._id).toBe("mocked_post_id");
    expect(createdPost.title).toBe(title);
    expect(createdPost.author).toBe(author);
    expect(createdPost.content).toBe(content);
  });

  it("id should not be valid", async () => {
    const id = "123456";

    try {
      await getWithId(id);
      fail("Expected function to throw an error, but it did not.");
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
      expect(String(error)).toEqual("TypeError: Id (123456) not valid.");
    }
  });
});
