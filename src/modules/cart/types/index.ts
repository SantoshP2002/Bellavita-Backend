import { Types } from "mongoose";

export interface ICart {
  _id: string
  user: Types.ObjectId;
  products: Array<Types.ObjectId>;
  charges: number;
}
