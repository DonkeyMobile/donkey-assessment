import { User } from "../models/user.js";
/**
 * Create a new user
 */
export const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        // 1. Validate input
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required." });
        }
        // 2. Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use." });
        }
        // 3. Create the user
        const newUser = new User({
            name,
            email
        });
        let savedUser = await newUser.save();
        // 4. Respond with the created user
        return res.status(201).json(savedUser);
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
/**
 * Delete a user by ID
 */
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json({ message: "User deleted successfully." });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
