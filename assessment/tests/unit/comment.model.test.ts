import { Types } from "mongoose";
import { Comment } from "../../src/models/Comment";

describe("Comment model", () => {
  it("requires post, description and author", async () => {
    const comment = new Comment({});
    await expect(comment.validate()).rejects.toThrow();
  });

  it("creates a valid comment", () => {
    const comment = new Comment({
      post: new Types.ObjectId(),
      description: "Nice post!",
      author: "Alice",
    });
    const error = comment.validateSync();
    expect(error).toBeUndefined();
  });
});
