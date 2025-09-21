import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { isValidMongoId } from "../../../utils";
import { CartModule } from "../..";
import { AppError } from "../../../classes";
import { CartProduct } from "../model";

export const addProductToCartController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?._id;
  const { productId } = req.params;

  isValidMongoId(productId, "Invalid productId", 400);

  const cart = await CartModule.Models.Cart.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, products: [], charges: 0 } },
    { new: true, upsert: true }
  );

  if (!cart) throw new AppError("Cart not found", 404);

  const isProductExistInCart = cart.products.some(
    (cartProduct) => cartProduct.toString() === productId
  );

  if (isProductExistInCart) throw new AppError("Product already in cart", 400);

  const cartProduct = await CartProduct.create({
    cart: cart._id,
    product: productId,
    quantity: 1,
  });

  cart.products.push(cartProduct._id);

  await cart.save();
  res.success(200, "Product added to cart successfully");
};
