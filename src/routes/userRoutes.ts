import express from "express";
//import { createUser, getUsers, getUser, deleteUser, updateUser } from "../controllers/UserController";
import { getUsers, getUser, createUser, deleteUser, updateUser } from "../controllers/UserController";

const router = express.Router();

// Should be able to create, update, get and remove users.
// Removing a user also means removing the users' comments and posts.

router.get("/", getUsers);
router.get("/:id", getUser);

router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
