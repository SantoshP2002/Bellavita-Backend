import { Types } from "mongoose";
import { UserModule } from "../..";

export interface ReviewProps {
  _id: Types.ObjectId;
  rating: number;
  title: string;
  product: Types.ObjectId;
  user: Types.ObjectId;
  images: string[];
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewPopulateFieldProps {
  user: keyof UserModule.ITypes.IUser;
}
