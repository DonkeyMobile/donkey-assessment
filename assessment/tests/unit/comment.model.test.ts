import { Types } from "mongoose";
import { Comment } from "../../src/models/Comment";

describe("Comment model", () => {
  it("requires post, description and author", async () => {
    const comment = new Comment({});
    let error: Error | null = null;
    try {
      await comment.validate();
    } catch (err) {
      error = err as Error;
    }
    expect(error).not.toBeNull();
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
