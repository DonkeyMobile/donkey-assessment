import mongoose, { Document, Schema } from "mongoose";

export interface ITimeline extends Document {
  description: string;
}

const timelineSchema = new Schema<ITimeline>({
    description: {
      type : String, 
      required: true,
      trim: true,
      minlength: [2, "Description must be at least 2 characters"],
      maxlength: [500, "Description must be under 500 characters"]
    }
}, { timestamps: true });

export const Timeline = mongoose.model<ITimeline>("Timeline", timelineSchema);