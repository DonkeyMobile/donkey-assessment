import { Router } from "express";
import { postRouter } from "./posts.js";
import { userRouter } from "./users.js";

const router = Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);

export { router as apiRouter };
