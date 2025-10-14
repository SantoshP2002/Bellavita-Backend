import { model, Schema } from "mongoose";
import { IProduct } from "../types";

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    images: { type: [String], required: true, default: [] },
    category: { type: String, required: true },
  }
);
export const Product = model<IProduct>("Product", productSchema);
