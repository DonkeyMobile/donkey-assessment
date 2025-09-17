"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const post_js_1 = require("../models/post.js");
const user_js_1 = require("../models/user.js");
/**
 * Create a new post
 */
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, userId } = req.body;
        // 1. Validate input
        if (!title || !userId) {
            return res.status(400).json({ message: "Title and userId are required." });
        }
        // 2. Check if the author exists
        const user = yield user_js_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Author not found." });
        }
        // 3. Create the post
        const newPost = new post_js_1.Post({
            title,
            content,
            userId: userId,
            createdAt: new Date()
        });
        yield newPost.save();
        // 4. Respond with the created post
        return res.status(201).json(newPost);
    }
    catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createPost = createPost;
