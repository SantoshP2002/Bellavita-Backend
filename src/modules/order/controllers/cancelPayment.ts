import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { Order } from "../schema";
import { AppError } from "../../../classes";
import { isValidMongoId } from "../../../utils";

export const cancelPaymentController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const user = req.user;
  const { orderId } = req.params;

  isValidMongoId(orderId, "Invalid Order Id provided", 400);

  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError("Order Not Found In Cancel Payment", 400);
  }

  if (user?._id?.toString() !== order?.user?.toString()) {
    throw new AppError("You can not cancel another user's order", 400);
  }

  await order.updateOne({
    $set: {
      "razorpay_payment_result.rzp_payment_status": "CANCELLED",
      "order_result.order_status": "CANCELLED",
    },
  });

  res.success(201, "Order Cancelled Successfully!");
};
