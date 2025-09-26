import { Request, Response } from "express";
import { Product } from "../models";
import { AppError } from "../../../classes";

export const getProductByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  console.log("product", product, id)
  if (!product) {
    throw new AppError("Product not found", 404);
  }
  res.success(200, "Product found successfully", { product });
};
