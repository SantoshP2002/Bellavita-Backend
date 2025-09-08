import { Request, Response } from "express";

export const getProductsController = async (req: Request, res: Response) => {
  console.log(req.body);
  res.success(200, "Get Products successfully");
};
