import mongoose from "mongoose";
import app from "./app.js"; // Make sure app.ts uses `export default app`

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/Assessment_MO")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("MongoDB connection error:", err));
