import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { isValidMongoId } from "../../../utils";
import { AppError } from "../../../classes";
import { Cart } from "../models";
import { ProductModule } from "../..";
import { TCartProduct } from "../types";
import { Types } from "mongoose";

export const addToCartController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?._id;
  const { productId } = req.params;

  isValidMongoId(productId, "Invalid productId", 400);

  const cart = await Cart.findOneAndUpdate(
    {userId},
    { $setOnInsert: { userId, products: [], totalPrice: 0 } },
    { new: true, upsert: true }
  );

  if (!cart) throw new AppError("Cart not found", 404);

  const isProductExistInCart = cart.products.some(
    (cartProduct) => cartProduct.productId.toString() === productId
  );

  if (isProductExistInCart) {
    throw new AppError("Product already in cart", 400);
  }

  const product = await ProductModule.Models.Product.findById(productId).lean();
  if (!product) throw new AppError("Product not found", 404);

  const cartProduct: TCartProduct = {
    productId: new Types.ObjectId(productId),
    quantity: 1,
    price: product.sellingPrice,
  };

  cart.products.push(cartProduct);

  cart.totalPrice += product.sellingPrice;

  await cart.save();

  res.success(200, "Product added to cart successfully");
};
