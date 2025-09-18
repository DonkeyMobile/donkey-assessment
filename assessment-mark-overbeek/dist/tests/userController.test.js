"use strict";
// ✅ Mock the User model before importing the controller
jest.mock("../models/user.js", () => {
    const mockFindOne = jest.fn();
    // Simulate Mongoose model constructor
    function MockUser(data) {
        return {
            ...data,
            save: jest.fn().mockResolvedValue({
                _id: "new-id",
                name: data.name,
                email: data.email
            })
        };
    }
    MockUser.findOne = mockFindOne;
    return {
        User: MockUser
    };
});
const { createUser } = require("../controllers/userController");
const { User } = require("../models/user.js");
describe("createUser controller", () => {
    let req, res;
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, "error").mockImplementation(() => { });
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    it("should return 400 if name or email is missing", async () => {
        req.body = { name: "", email: "" };
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Name and email are required." });
    });
    it("should return 409 if email already exists", async () => {
        req.body = { name: "John", email: "john@example.com" };
        User.findOne.mockResolvedValue({ _id: "existing-id" });
        await createUser(req, res);
        expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ message: "Email already in use." });
    });
    it("should create and return a new user", async () => {
        req.body = { name: "Jane", email: "jane@example.com" };
        User.findOne.mockResolvedValue(null);
        const mockUserData = {
            _id: "new-id",
            name: "Jane",
            email: "jane@example.com"
        };
        User.prototype.save = jest.fn().mockResolvedValue(mockUserData);
        await createUser(req, res);
        expect(User.findOne).toHaveBeenCalledWith({ email: "jane@example.com" });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockUserData);
    });
    it("should handle internal errors", async () => {
        req.body = { name: "Error", email: "error@example.com" };
        User.findOne.mockRejectedValue(new Error("DB failure"));
        await createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
    });
});
