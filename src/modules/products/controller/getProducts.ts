import { Request, Response } from "express";
import { Product } from "../models";

export const getAllProductsController = async (req: Request, res: Response) => {
  const page = Number(req.query?.page);
  const limit = Number(req.query?.limit);
  const skip = page && limit ? (page - 1) * limit : 0;

  // Get filter and sort query params
  const category = req.query?.category as string | undefined;
  const sortBy = req.query?.sortBy as string | undefined;
  const search = req.query?.search as string | undefined;

  const filter: Record<string, any> = {};

  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [{ title: regex }, { brand: regex }, { category: regex }];
  }

  if (category) filter.category = category;

  const sort: Record<string, 1 | -1> = {};
  if (sortBy === "price_low_high") sort.sellingPrice = 1;
  else if (sortBy === "price_high_low") sort.sellingPrice = -1;
  else if (sortBy === "newest_first") sort.createdAt = -1;
  else if (sortBy === "oldest_first") sort.createdAt = 1;

  // Pagination
  let query = Product.find(filter);
  if (Object.keys(sort).length > 0) query = query.sort(sort);
  if (page && limit) query = query.skip(skip).limit(limit);

  const [products, totalProducts] = await Promise.all([
    query.lean(),
    Product.countDocuments(filter).exec(),
  ]);

  res.success(200, "Products found successfully", {
    products,
    currentPage: page || 1,
    totalProducts,
    totalPages: page && limit ? Math.ceil(totalProducts / limit) : 1,
  });
};
