import mongoose from "mongoose";
import app from "./app.js"; // Make sure app.ts uses `export default app`

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/Assessment_MO";
 
mongoose.connect(MONGODB_URI)
   .then(() => {
     console.log("MongoDB connected");
    app.listen(PORT, () => {
       console.log(`Server running on port ${PORT}`);
     });
   })
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });