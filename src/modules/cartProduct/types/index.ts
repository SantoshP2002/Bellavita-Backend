import { Types } from "mongoose";
import { ProductModule } from "../..";

export type ICartProduct = {
  cart: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  createdBy: Types.ObjectId;
};
export interface IPopulatedCartProduct extends Omit<ICartProduct, "product"> {
  product: ProductModule.PTypes.IProduct;
}
