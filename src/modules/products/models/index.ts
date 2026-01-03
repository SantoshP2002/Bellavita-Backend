import { model, Schema } from "mongoose";
import { IProduct } from "../types";

const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true },
  },
  { versionKey: false, _id: false }
);
const subCategorySchema = new Schema(
  {
    name: { type: String, default: "" },
    value: { type: String, default: "" },
  },
  { versionKey: false, _id: false }
);

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    keyBenefits: { type: String, default: "" },
    howToUse: { type: String, default: "" },
    ingredients: { type: String, default: "" },
    otherInformation: { type: String, default: "" },
    price: { type: Number, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    sellingPrice: { type: Number, required: true },
    images: { type: [String], required: true, default: [] },
    category: categorySchema,
    subCategory: subCategorySchema,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
export const Product = model<IProduct>("Product", productSchema);
