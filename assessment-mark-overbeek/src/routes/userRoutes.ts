import express from "express";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

// POST /posts
router.post("/", createUser);

export default router;
