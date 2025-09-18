import express from "express";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import attachmentRoutes from "./routes/attachmentRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/attachments", attachmentRoutes);
app.use("/timelines", timelineRoutes);

export default app;
