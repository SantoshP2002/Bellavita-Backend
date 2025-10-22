import { Types } from "mongoose";

export interface IProduct {
  _id: string;
  title: string;
  brand: string;
  description: string;
  price: number;
  sellingPrice: number;
  category: string;
  reviews: Types.ObjectId[];
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
