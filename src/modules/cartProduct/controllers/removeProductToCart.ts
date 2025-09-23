import { NextFunction, Response } from "express";
import { AuthorizedRequest } from "../../../types";
import { ClientSession } from "mongoose";
import { isValidMongoId } from "../../../utils";
import { CartProduct } from "../model";
import { AppError } from "../../../classes";
import { Cart } from "../../cart/models";

export const removeProductToCartController = async (
  req: AuthorizedRequest,
  res: Response,
  _next: NextFunction,
  session: ClientSession
) => {
  const { cartProductId } = req.params;
  isValidMongoId(cartProductId, "Invalid Cart Product Id provided", 400);

  const cartProduct = await CartProduct.findById(cartProductId).session(
    session
  );

  if (!cartProduct) {
    throw new AppError("Cart product not found", 404);
  }

  const cart = await Cart.findByIdAndUpdate(
    cartProduct.cart,
    { $pull: { products: cartProduct._id } },
    { new: true, session }
  );

  if (!cart) {
    throw new AppError("Associated cart not found", 404);
  }

  await CartProduct.deleteOne({ _id: cartProduct._id }).session(session);

  res.success(200, "Product removed from cart successfully", { cartProductId });
};
