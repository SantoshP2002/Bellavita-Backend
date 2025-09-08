import { model, Schema } from "mongoose";
import { IProduct } from "../types";

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    image: [{ type: String, required: true }],
    category: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
export const Product = model<IProduct>("Product", productSchema);
