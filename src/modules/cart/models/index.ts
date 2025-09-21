import { model, Schema } from "mongoose";
import { ICart } from "../types";
import { required } from "zod/v4/core/util.cjs";

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // products: [
    //   {
    //     _id: false,
    //     productId: {
    //       type: Schema.Types.ObjectId,
    //       ref: "Product",
    //       required: true,
    //     },
    //     quantity: {
    //       type: Number,
    //       required: true,
    //       min: 1,
    //       max: 10,
    //       default: 1,
    //     },
    //     price: { type: Number, required: true, min: 0, default: 0 },
    //   },
    // ],

    products: {
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
    price: { type: Number, required: true, min: 0, default: 0 },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Cart = model<ICart>("Cart", cartSchema);
