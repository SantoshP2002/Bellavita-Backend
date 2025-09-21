import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";

export const addProductToCartController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  console.log("REQ.BODY", req.body);
  res.success(200, "Product added to cart successfully");
};
