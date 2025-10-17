import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { Order } from "../schema";
import { AppError } from "../../../classes";

export const getByIdOrderController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { orderId } = req.params;

  console.log("OrderID", orderId);

  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError("Order Not Found in get Id Order", 400);
  }

  res.success(201, "Order Get By Id Successfully", { order });
};
