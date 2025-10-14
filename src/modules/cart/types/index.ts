import { Types } from "mongoose";
import { CartProductModule } from "../..";

export interface ICart {
  _id: string;
  user: Types.ObjectId;
  products: Array<Types.ObjectId>;
}


export interface IPopulatedCart extends Omit<ICart, "products"> {
  products: CartProductModule.ITypes.IPopulatedCartProduct[];
}