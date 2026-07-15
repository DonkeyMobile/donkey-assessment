import dotenv from "dotenv";

dotenv.config();

export const config = {
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/donkey",
  port: parseInt(process.env.PORT || "3000", 10),
  uploadDir: process.env.UPLOAD_DIR || "uploads",
};
