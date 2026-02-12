import { model, Schema } from "mongoose";
import { INewsroom } from "../types";

const newsroomSchema = new Schema<INewsroom>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    newsroom: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const NewsroomModel = model<INewsroom>("Newsroom", newsroomSchema);
