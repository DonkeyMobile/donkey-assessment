import express from "express";
import { connect, ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import { ErrorRequestHandler } from "express";
import { CustomError } from "./utils/customErrorHandling";

const app = express();
const port = 3000;

// Routes
import postRoutes from "./routers/post.routes";

// Connect to local MongoDB instance
const MONGO_URI = "mongodb+srv://dm:D0nk3yMobile2023@donkeymobile.uxtzesu.mongodb.net/donkeymobile";

connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
} as ConnectOptions)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.error("Failed to connect to MongoDB:", error.message);
	});

// Generic error handling
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	if (err instanceof CustomError) {
		res.status(err.statusCode).json({ error: err.message });
	} else {
		// For non-custom errors or unexpected errors, use a generic error response
		res.status(500).json({ error: "Something went wrong" });
	}
};

app.use(bodyParser.json());

// Load routes
app.use("/api/posts", postRoutes);

// Add error handling middleware
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server is listening on http://localhost:${port}`);
});
