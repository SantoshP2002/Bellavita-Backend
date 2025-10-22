import { model, Schema, Types } from "mongoose";
import { ReviewProps } from "../types";

export const reviewSchema = new Schema<ReviewProps>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 5, required: true, default: 1 },
    title: { type: String, trim: true, required: true },
    images: { type: [String], default: [] },
    likes: { type: [Types.ObjectId], default: [] },
    dislikes: { type: [Types.ObjectId], default: [] },
  },
  { timestamps: true, versionKey: false }
);

reviewSchema.index({ product: 1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ rating: 1 });
reviewSchema.index({ title: 1 });
reviewSchema.index({ createdAt: 1 });
reviewSchema.index({ images: 1 });
reviewSchema.index({ likes: 1 });
reviewSchema.index({ dislikes: 1 });

export const Review = model<ReviewProps>("Review", reviewSchema);
