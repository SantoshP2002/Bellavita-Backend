import { Request, Response } from "express";
import { Product } from "../models";

export const getAllProductsController = async (_req: Request, res: Response) => {
  const product = await Product.find({});
  res.success(200, "Products found successfully", { product });
};
