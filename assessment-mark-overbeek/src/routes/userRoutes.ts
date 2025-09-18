import express from "express";
import { createUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// POST /posts
router.post("/", createUser);
router.delete("/:userId", deleteUser);

export default router;
