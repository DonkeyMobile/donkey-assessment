import mongoose, { Document, Schema } from "mongoose";

export interface ITimeline extends Document {
  description: string;
}

const timelineSchema = new mongoose.Schema({
    description: {type : String, required: true }
});

export const Timeline = mongoose.model<ITimeline>("Timeline", timelineSchema);