import mongoose from "mongoose";
const timelineSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, "Description must be at least 2 characters"],
        maxlength: [500, "Description must be under 500 characters"]
    }
});
export const Timeline = mongoose.model("Timeline", timelineSchema);
