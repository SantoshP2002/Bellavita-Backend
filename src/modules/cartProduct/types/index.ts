import { Types } from "mongoose";
import { ProductModule } from "../..";

export type ICartProduct = {
  cart: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
};
export interface IPopulatedCartProduct extends Omit<ICartProduct, "product"> {
  product: ProductModule.PTypes.IProduct;
}