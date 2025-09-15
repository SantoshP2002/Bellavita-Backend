import { Request, Response } from "express";
import { Product } from "../models";

export const getAllProductsController = async (
  _req: Request,
  res: Response
) => {
  const products = (await Product.find().lean()) ?? [];
  res.success(200, "Products found successfully", { products });
};
