import { Types } from "mongoose";

export type ICartProduct = {
  cart: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
};
