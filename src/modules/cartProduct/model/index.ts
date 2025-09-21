import { model, Schema } from "mongoose";
import { ICartProduct } from "../types";

export const cartProductSchema = new Schema<ICartProduct>(
  {
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
      default: 1,
    },
  },
  { versionKey: false }
);

export const CartProduct = model<ICartProduct>("CartProduct", cartProductSchema);