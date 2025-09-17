
const mockSave = jest.fn();
const mockPostData = {
  _id: "post123",
  title: "Test Post",
  content: "Hello",
  userId: "abc123",
  createdAt: expect.any(Date)
};

jest.mock("../models/user.js", () => {
    return {
      User: {
        findById: jest.fn()
      }
    };
  });
  
  jest.mock("../models/post.js", () => {
    return {
      Post: jest.fn()
    };
  });
  
  const { createPost } = require("../controllers/postController");
  const { User } = require("../models/user.js");
  const { Post } = require("../models/post.js");
  
  describe("createPost controller", () => {
    let req, res;
  
    beforeEach(() => {
      jest.clearAllMocks();
  
      req = {
        body: {}
      };
  
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });
  
    it("should return 400 if title or userId is missing", async () => {
      req.body = { title: "", userId: "" };
  
      await createPost(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Title and userId are required." });
    });
  
    it("should return 404 if user is not found", async () => {
      req.body = { title: "Test Post", content: "Hello", userId: "abc123" };
      User.findById.mockResolvedValue(null);
  
      await createPost(req, res);
  
      expect(User.findById).toHaveBeenCalledWith("abc123");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Author not found." });
    });
  
    it("should create and return a new post", async () => {
      req.body = { title: "Test Post", content: "Hello", userId: "abc123" };
      User.findById.mockResolvedValue({ _id: "abc123", name: "Author" });
  
      const mockPostData = {
        _id: "post123",
        title: "Test Post",
        content: "Hello",
        userId: "abc123",
        createdAt: expect.any(Date)
      };
  
      mockSave.mockResolvedValue(mockPostData);
      Post.mockImplementation(() => ({
        ...mockPostData,
        save: mockSave
      }));
      
  
      await createPost(req, res);
  
      expect(Post).toHaveBeenCalledWith({
        title: "Test Post",
        content: "Hello",
        userId: "abc123",
        createdAt: expect.any(Date)
      });
  
      expect(mockSave).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockPostData);
    });
  
    it("should handle internal errors", async () => {
      req.body = { title: "Test Post", content: "Hello", userId: "abc123" };
      User.findById.mockRejectedValue(new Error("DB error"));
  
      await createPost(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });
  });
  