import { Types } from "mongoose";

export interface IProduct {
  _id: string;
  title: string;
  brand: string;
  description: string;
  keyBenefits?: string;
  howToUse?: string;
  ingredients?: string;
  otherInformation?: string;
  price: number;
  sellingPrice: number;
  category: { name: string; value: string };
  subCategory: { name: string; value: string };
  reviews: Types.ObjectId[];
  images: string[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
