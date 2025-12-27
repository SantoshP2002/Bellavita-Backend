import { model, Schema } from "mongoose";
import { IBlog } from "../types";

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    blog: { type: String, required: true },
    image: { type: String, required: true },
    imagePublicId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Blog = model<IBlog>("Blog", blogSchema);
