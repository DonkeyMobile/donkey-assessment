import { connect } from "mongoose";
import app from "./app.js";

const webPort = process.env.PORT || 3000;
const dbHost =
  process.env.DATABASE_URI ||
  "mongodb://root:Password@localhost:27018/donkey?authSource=admin";

// Start server
connect(dbHost).then(() => {
  console.log("Connected to database");
  app.listen(webPort, () => {
    console.log("Server started on port:", webPort);
  });
});
