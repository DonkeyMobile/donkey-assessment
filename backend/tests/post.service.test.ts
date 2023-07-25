import { create, getWithId } from "../src/services/post.service";
import PostModel from "../src/models/post.model";
import { CustomError } from "../src/utils/customErrorHandling";

// Mock PostModel
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
		// Create new mock post
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

		// Check if the post has been created
		expect(createdPost._id).toBe("mocked_post_id");
		expect(createdPost.title).toBe(title);
		expect(createdPost.author).toBe(author);
		expect(createdPost.content).toBe(content);
	});

	it("id should not be valid", async () => {
		// Create fake id
		const id = "123456";

		try {
			await getWithId(id);
			// If there are no errrors, fail the test
			fail("Expected function to throw an error, but it did not.");
		} catch (error) {
			// Check if there are any errors
			expect(error).toBeInstanceOf(CustomError);
			expect(String(error)).toEqual("TypeError: Id (123456) not valid.");
		}
	});
});
