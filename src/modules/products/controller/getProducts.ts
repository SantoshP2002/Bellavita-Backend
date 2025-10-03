import { Request, Response } from "express";
import { Product } from "../models";

export const getAllProductsController = async (req: Request, res: Response) => {
  const page = Number(req.query?.page);
  const limit = Number(req.query?.limit);
  const skip = page && limit ? (page - 1) * limit : 0;

  // const category = req.query?.category as string | undefined;
  // const filter: Record<string, any> = {};

  // if (category) {
  //   filter.category = category;
  // }

  // Pagination
  let query = Product.find();

  if (page && limit) {
    query = query.skip(skip).limit(limit);
  }

  const [products, totalProducts] = await Promise.all([
    query.lean(),
    Product.countDocuments().exec(),
  ]);

  res.success(200, "Products found successfully", {
    products,
    currentPage: page || 1,
    totalProducts,
    totalPages: page && limit ? Math.ceil(totalProducts / limit) : 1,
  });
};
