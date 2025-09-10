import { Request, Response } from "express";
import { Product } from "../models";
import { AppError } from "../../../classes";

export const createProductsController = async (req: Request, res: Response) => {
  const { title, brand, description, price, sellingPrice, category } = req.body;

  const product = await Product.create({
    title,
    brand,
    description,
    price,
    sellingPrice,
    category,
  });
  if (!product) {
    throw new AppError("Failed to create product", 400);    
  }
  await product.save();
  res.success(200, "Product created Successfully", { product });
};
