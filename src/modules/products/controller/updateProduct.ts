import { Request, Response } from "express";
import { Product } from "../models";
import { AppError } from "../../../classes";

export const updateProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;
  const product = await Product.findByIdAndUpdate(id, update, { new: true });
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  res.success(200, "Product updated successfully", { product });
};