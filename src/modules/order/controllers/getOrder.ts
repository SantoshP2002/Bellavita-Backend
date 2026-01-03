import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { Order } from "../schema";

export const getOrderController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req?.user?._id;

  const orders = await Order.find({ user: userId });

  res.success(200, "Get Order Successfully", { orders });
};
