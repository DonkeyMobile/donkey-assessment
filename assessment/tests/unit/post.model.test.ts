import { Post } from "../../src/models/Post";

describe("Post model", () => {
  it("requires date and description", async () => {
    const post = new Post({});
    let error: Error | null = null;
    try {
      await post.validate();
    } catch (err) {
      error = err as Error;
    }
    expect(error).not.toBeNull();
  });

  it("creates a valid post with defaults", async () => {
    const post = new Post({ date: new Date(), description: "A test post" });
    const error = post.validateSync();
    expect(error).toBeUndefined();
    expect(post.attachments).toEqual([]);
    expect(post.comments).toEqual([]);
  });
});
