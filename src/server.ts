import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/testdb"; // ✅ Default to local for non-Docker runs

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log(`✅ Connected to MongoDB at ${MONGO_URI}`);
        app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    })
    .catch(err => console.error("❌ Database connection error:", err));
