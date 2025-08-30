import { model, Schema } from "mongoose";

interface IProduct {
  title: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  stock: number;
  rating?: number;
  image: string;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0 },
    image: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const productModel = model<IProduct>("Product", productSchema);

export default productModel;
