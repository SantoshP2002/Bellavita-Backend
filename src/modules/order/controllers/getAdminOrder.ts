import { Response } from "express";
import { AuthorizedRequest } from "../../../types";
import { Order } from "../schema";

export const getAdminOrderController = async (
  _req: AuthorizedRequest,
  res: Response
) => {
  const orders = await Order.find().populate("user", "email role name").lean();

  res.success(200, "Get Order Successfully", { orders });
};
