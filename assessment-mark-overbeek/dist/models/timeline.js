import mongoose from "mongoose";
const timelineSchema = new mongoose.Schema({
    description: { type: String, required: true }
});
export const Timeline = mongoose.model("Timeline", timelineSchema);
