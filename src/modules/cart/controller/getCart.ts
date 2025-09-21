import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { Cart } from "../models";
import { AppError } from "../../../classes";

export const getCartController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?._id;
  const cart = await Cart.findOne({ user: userId }).populate({
    path: "products", // All Products in the cart
    populate: [
      {
        path: "product", // Product Path
        model: "Product", // Product Model
        select: "title brand price sellingPrice images", // Required Product Fields
        options: { select: { images: { $slice: 1 } } }, // It will give us Only One image in an Array
      },
    ],
  });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  res.success(200, "Cart found successfully", { cart });
};
