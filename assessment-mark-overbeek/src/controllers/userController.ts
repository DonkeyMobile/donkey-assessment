import mongoose from "mongoose";
import { Request, Response } from "express";
import { User, IUser } from "../models/user.js";

/**
 * Create a new user
 */
export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        // Basic validation
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required." });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use." });
        }

        // Create the user
        const newUser = new User({
            name,
            email
        });
        
        // force schema validation
        try {
            await newUser.save();
        }catch (err: any) {
            return res.status(400).json({error: err.message});       
        }

        // Respond with the created user
        return res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * Delete a user by ID
 */
export const deleteUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId format." });
      }
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found." });
      }
  
      return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  