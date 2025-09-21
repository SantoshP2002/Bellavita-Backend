import { Types } from "mongoose";

export type TCartProduct = {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
};
export interface ICart {
  user: Types.ObjectId;
  products: Array<Types.ObjectId>;
  createdAt: Date;
  updatedAt: Date;
}
