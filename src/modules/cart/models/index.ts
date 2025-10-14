import { model, Schema } from "mongoose";
import { ICart } from "../types";

const cartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: { type: [{ type: Schema.Types.ObjectId, ref: "CartProduct" }] },
  },
  { timestamps: true, versionKey: false }
);

export const Cart = model<ICart>("Cart", cartSchema);
