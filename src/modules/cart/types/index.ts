import { Types } from "mongoose";

export interface ICart {
  user: Types.ObjectId;
  products: Array<Types.ObjectId>;
  charges: number;
}
