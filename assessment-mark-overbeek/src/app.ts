import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

export default app;
