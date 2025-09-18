import { jest } from "@jest/globals";
// Mocks
const mockSave = jest.fn();
const mockCommentData = {
    _id: "comment123",
    title: "Test Comment",
    content: "Hello, new comment",
    postId: "post123",
    userId: "user123",
    createdAt: expect.any(Date)
};
jest.unstable_mockModule("../models/user.js", () => ({
    User: {
        findById: jest.fn()
    }
}));
jest.unstable_mockModule("../models/post.js", () => ({
    Post: {
        findById: jest.fn()
    }
}));
jest.unstable_mockModule("../models/comment.js", () => ({
    Comment: jest.fn()
}));
// Re-import after mocking
const { createComment } = await import("../controllers/commentController.js");
const { User } = await import("../models/user.js");
const { Post } = await import("../models/post.js");
const { Comment } = await import("../models/comment.js");
describe("createComment controller", () => {
    let req;
    let res;
    beforeEach(() => {
        jest.clearAllMocks();
        mockSave.mockReset();
        jest.spyOn(console, "error").mockImplementation(() => { });
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    it("should return 400 if title or userId is missing", async () => {
        req.body = { title: "", userId: "", postId: "" };
        await createComment(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Title, postId and userId are required." });
    });
    it("should return 404 if user is not found", async () => {
        req.body = { title: "Test Comment", content: "Hello, new comment", postId: "post123", userId: "user999" };
        User.findById.mockResolvedValue(null);
        Post.findById.mockResolvedValue({ _id: "post123", name: "Post" });
        await createComment(req, res);
        expect(User.findById).toHaveBeenCalledWith("user999");
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Author not found." });
    });
    it("should return 404 if post is not found", async () => {
        req.body = { title: "Test Comment", content: "Hello, new comment", postId: "post999", userId: "user123" };
        Post.findById.mockResolvedValue(null);
        User.findById.mockResolvedValue({ _id: "user123", name: "Author" });
        await createComment(req, res);
        expect(Post.findById).toHaveBeenCalledWith("post999");
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Post not found." });
    });
    it("should create and return a new comment", async () => {
        req.body = { title: "Test Comment", content: "Hello, new comment", postId: "post123", userId: "user123" };
        User.findById.mockResolvedValue({ _id: "user123", name: "Author" });
        Post.findById.mockResolvedValue({ _id: "post123", name: "Post" });
        mockSave.mockResolvedValue(mockCommentData);
        Comment.mockImplementation(() => ({
            ...mockCommentData,
            save: mockSave
        }));
        await createComment(req, res);
        expect(Comment).toHaveBeenCalledWith({
            title: "Test Comment",
            content: "Hello, new comment",
            postId: "post123",
            userId: "user123",
            createdAt: expect.any(Date)
        });
        expect(mockSave).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockCommentData);
    });
    it("should handle internal errors from User", async () => {
        req.body = { title: "Test Comment", content: "Hello, new comment", postId: "post123", userId: "user123" };
        User.findById.mockRejectedValue(new Error("DB error"));
        await createComment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });
    it("should handle internal errors from Post", async () => {
        req.body = { title: "Test Comment", content: "Hello, new comment", postId: "post123", userId: "user123" };
        Post.findById.mockRejectedValue(new Error("DB error"));
        await createComment(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });
});
