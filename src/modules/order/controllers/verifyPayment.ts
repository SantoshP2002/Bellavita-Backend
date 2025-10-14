import { Response } from "express";
import crypto from "crypto";
import { AuthenticatedRequest } from "../../../types";
import { AppError } from "../../../classes";
import { RAZORPAY_KEY_SECRET } from "../../../env";
import { razorpay } from "../../../configs/razorpay";
import { Order } from "../schema";
import { CartModule, CartProductModule, ProductModule } from "../..";

export const verifyPaymentController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const user = req.user;
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderDBId,
  } = req.body;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !orderDBId
  )
    throw new AppError("Missing required fields", 400);
  // expectedSignature
  const expectedSignature = crypto
    .createHmac("sha256", RAZORPAY_KEY_SECRET!)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");
  // expectedSignature compare razorpay signature
  if (expectedSignature !== razorpay_signature) {
    throw new AppError("Invalid Signature", 400);
  }

  // fetch with payment id in payment
  const payment: any = await razorpay.payments.fetch(razorpay_payment_id);

  if (payment) {
    throw new AppError("Payment not captured", 400);
  }

  if (payment.status === "captured") {
    try {
      // order in findByIdAndUpdate
      const order = await Order.findByIdAndUpdate(
        orderDBId,
        {
          $set: {
            "razorpay_payment_result.rzp_order_id": razorpay_order_id,
            "razorpay_payment_result.rzp_payment_id": razorpay_payment_id,
            "razorpay_payment_result.rzp_signature": razorpay_signature,
            "razorpay_payment_result.rzp_payment_status": "PAID",
            "payment_details.method": payment.method?.toUpperCase() || "OTHER",
            ...(payment.refund_status && {
              "payment_details.refund_status": payment.refund_status,
            }),
            ...(payment.bank && {
              "payment_details.bank": payment.bank,
            }),
            ...(payment.wallet && {
              "payment_details.wallet": payment.wallet,
            }),
            ...(payment.email && {
              "payment_details.email": payment.email,
            }),
            ...(payment.contact && {
              "payment_details.contact": payment.contact,
            }),
            "payment_details.fee": payment.fee ? Number(payment.fee) / 100 : 0,
            "payment_details.tax": payment.tax ? Number(payment.tax) / 100 : 0,
            ...(payment.vpa &&
              payment.acquirer_data?.upi_transaction_id && {
                "payment_details.upi": {
                  acquirer_data: {
                    rrn: payment.acquirer_data?.rrn,
                    upi_transaction_id:
                      payment.acquirer_data?.upi_transaction_id,
                    vpa: payment.vpa,
                  },
                },
              }),
            ...(payment.acquirer_data.bank_transaction_id && {
              "payment_details.netbanking": {
                acquirer_data: {
                  bank_transaction_id:
                    payment.acquirer_data.bank_transaction_id,
                },
              },
            }),
            ...((payment.token_id || payment.card) && {
              "payment_details.card": {
                ...(payment.token_id && {
                  token_id: payment.token_id,
                }),
                ...(payment.card && {
                  card: {
                    id: payment.card.id,
                    name: payment.card.name,
                    last4: payment.card.last4,
                    network: payment.card.network,
                    type: payment.card.type,
                    issuer: payment.card.issuer,
                  },
                }),
              },
            }),

            "order_result.paid_at": new Date(payment.created_at * 1000),
            "order_result.order_status": "CONFIRMED",
            "order_result.payment_receipt": `payment_receipt_${Date.now()}`,
          },
        },
        { new: true }
      );
      // check order exist or not
      if (!order) throw new AppError("Order Not Found in verify Payment", 400);

      for (const item of order.products) {
        await ProductModule.Models.Product.updateOne({
          _id: item.product._id,
        });
      }

      // cart find one
      const cart = await CartModule.Models.Cart.findOne({ user: user?._id });
      if (!cart) throw new AppError("Cart Not Found in verify Payment", 400);

      // cart product delete many
      await CartProductModule.Models.CartProduct.deleteMany({
        _id: { $in: cart.products.map((p) => p._id) },
      });
      // cart find and update
      await CartModule.Models.Cart.findOneAndUpdate(
        { user: user?._id },
        { $set: { products: [], charges: 0 } }
      );
    } catch (error) {
      throw new AppError(
        error instanceof Error
          ? error.message
          : "Failed to update payment status.",
        500
      );
    }
  }
  res.success(201, "Payment verified successfully");
};
