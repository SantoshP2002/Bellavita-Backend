import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { Cart } from "../models";
import { AppError } from "../../../classes";

export const getCartController = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?._id;
  const cart = await Cart.findOne({userId}).lean();

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  res.success(200, "Cart found successfully", { cart });
};
