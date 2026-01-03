import { Response } from "express";
import { AuthorizedRequest } from "../../../types";
import { CartProduct } from "../model";
import { isValidMongoId } from "../../../utils";
import { AppError } from "../../../classes";

export const updateProductCartQuantityController = async (
  req: AuthorizedRequest,
  res: Response
) => {
  const { quantity } = req.body;

  const { cartProductId } = req.params;
  isValidMongoId(cartProductId, "Invalid cartProductId", 400);

  console.log("cartProductId", cartProductId);

  const cartProduct = await CartProduct.findByIdAndUpdate(
    cartProductId,
    { quantity },
    { new: true }
  );

  if (!cartProduct) throw new AppError("CartProduct not found", 404);

  res.success(200, "Product quantity updated successfully", { quantity });
};
