import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { AppError } from "../../../classes";
import { Cart } from "../../cart/models";
import { Types } from "mongoose";
import { IPopulatedCart } from "../../cart/types";
import { IOrder } from "../types";
import { Order } from "../schema";
import { Address } from "../../address/model";
import { razorpay } from "../../../configs/razorpay";

export const createOrderController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const user = req.user;
  const { addressId } = req.query ?? {};

  if (!addressId) {
    throw new AppError("Address are Required", 400);
  }

  // Cart Find
  const cart = (await Cart.findOne({ user })
    .populate({
      path: "products", // All Products in the cart
      populate: [
        {
          path: "product", // Product Path
          model: "Product", // Product Model
          select: "title brand price sellingPrice images", // Required Product Fields
          options: { select: { images: { $slice: 1 } } }, // It will give us Only One image in an Array
        },
      ],
    })
    .lean()) as unknown as IPopulatedCart;

  if (!cart) {
    throw new AppError("Cart not found In Orders", 404);
  }

  // totalPrice
  const totalPrice = cart.products.reduce((acc, product) => {
    return acc + product.product.sellingPrice * product.quantity;
  }, 0);

  let razorpayOrder;

  try {
    razorpayOrder = await razorpay.orders.create({
      amount: totalPrice * 100,
      currency: "INR", // Currency
      receipt: `payment_receipt_${Date.now()}`,
      payment_capture: true,
      notes: {
        buyer_id: `${user?._id}`,
        buyer_name: `${user?.firstName} ${user?.lastName}`,
        buyer_email: `${user?.email}`,
        buyer_device_ip: req.ip || "",
        buyer_device_user_agent: req.headers?.["user-agent"] || "",
      },
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    throw new AppError("Payment gateway error, please try again later", 502);
  }

  const address = await Address.findById(addressId).lean();

  if (!address) {
    throw new AppError("Address Not Found In Order", 400);
  }

  const orderBody: Pick<
    IOrder,
    "user" | "products" | "totalPrice" | "address"
  > & {
    razorpay_payment_result: Partial<IOrder["razorpay_payment_result"]>;
    order_result: Partial<IOrder["order_result"]>;
  } = {
    user: new Types.ObjectId(user?._id),
    products: cart.products || [],
    address,
    razorpay_payment_result: {
      rzp_payment_status: "UNPAID",
      currency: "INR",
      payment_mode: "ONLINE",
    },
    order_result: {
      order_status: "PENDING",
      price: totalPrice,
      order_receipt: razorpayOrder.receipt ?? "",
    },
    totalPrice,
  };

  const order = new Order(orderBody);

  const createOrder = await order.save();

  res.success(201, "Order Created Successfully", {
    createOrder,
    cart,
    orderBody,
    razorpayOrder,
  });
};
