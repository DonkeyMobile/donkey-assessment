import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find();
        if (!users) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            res.status(400).json({ error: "Name and email required" });
            return;
        }

        const user = new User({ name, email });
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email } = req.body;
        if (!name && !email) {
            res.status(400).json({ error: "At least one field (name or email) is required for update" });
            return;
        }

        const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true, runValidators: true });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}
