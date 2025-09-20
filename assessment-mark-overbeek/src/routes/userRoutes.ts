import express from "express";
import mongoose from "mongoose";
import { createUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// POST /users
router.post("/", createUser);
router.delete("/:userId", deleteUser);

router.param("userId", (req, res, next, val) => {
  if (!mongoose.Types.ObjectId.isValid(val)) {
  return res.status(400).json({ message: "Invalid userId format." });
  }
  next();
});
router.delete("/:userId", deleteUser);

export default router;
