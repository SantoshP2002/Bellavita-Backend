import { Request, Response } from "express";
import { AppError } from "../../../classes";
import { getUserByToken } from "../../user/services";
import { Product } from "../models";

export const getMyProductsController = async (req: Request, res: Response) => {
  const user = await getUserByToken(req);

  if (user.role !== "ADMIN") {
    throw new AppError("Access denied", 403);
  }

  const products = await Product.find({
    createdBy: user._id,
  });

  //   await products.save()
  res.success(200, "My products fetched", { products });
};
