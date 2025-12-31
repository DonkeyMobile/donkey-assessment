import { Router } from "express";
import { createUser, deleteUser } from "../controllers/User.js";
import { verifyLogin } from "../controllers/Auth.js";

const router = Router();

router.post("/", createUser);
router.delete("/", verifyLogin, deleteUser);

export { router as userRouter };
