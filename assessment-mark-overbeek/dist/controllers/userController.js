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
exports.createUser = void 0;
const user_js_1 = require("../models/user.js");
/**
 * Create a new user
 */
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        // 1. Validate input
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required." });
        }
        // 2. Check if the email already exists
        const existingUser = yield user_js_1.User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use." });
        }
        // 3. Create the user
        const newUser = new user_js_1.User({
            name,
            email
        });
        let savedUser = yield newUser.save();
        // 4. Respond with the created user
        return res.status(201).json(savedUser);
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createUser = createUser;
