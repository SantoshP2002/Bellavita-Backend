import { Types } from "mongoose";

export type TCartProduct = {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
};
export interface ICart {
  products: TCartProduct[];
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
