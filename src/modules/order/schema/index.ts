import { model, Schema } from "mongoose";
import { ALLOW_COUNTRIES } from "../../address/constants";
import { IOrder } from "../types";
import {
  ALLOWED_CURRENCIES,
  ALLOWED_PAYMENT_MODE,
  ORDER_STATUS,
  RAZORPAY_PAYMENT_METHODS,
  RAZORPAY_PAYMENT_STATUS,
} from "../constants";

// upi Schema
const upiSchema = new Schema(
  {
    acquirer_data: {
      rrn: { type: String },
      upi_transaction_id: { type: String },
      vpa: { type: String },
    },
  },
  { _id: false }
);

// netbanking Schema
const netbankingSchema = new Schema(
  {
    acquirer_data: { bank_transaction_id: { type: String } },
  },
  { _id: false }
);

// card Schema
const cardSchema = new Schema(
  {
    token_id: { type: String },
    acquirer_data: { auth_code: { type: String } },
    card: {
      id: { type: String },
      name: { type: String },
      last4: { type: String },
      network: { type: String },
      type: { type: String },
      issuer: { type: String },
    },
  },
  { _id: false }
);

export const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1, max: 5 },
      },
    ],
    address: {
      address: { type: String, required: true },
      landmark: { type: String, default: "" },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true, minlength: 6, maxlength: 6 },
      country: {
        type: String,
        required: true,
        enum: ALLOW_COUNTRIES,
        default: "India",
      },
      altPhoneNumber: { type: String, default: "" },
      phoneNumber: { type: String, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
    },
    razorpay_payment_result: {
      payment_mode: {
        type: String,
        enum: ALLOWED_PAYMENT_MODE,
        default: "ONLINE",
      },
      rzp_order_id: { type: String },
      rzp_payment_id: { type: String },
      rzp_signature: { type: String },
      rzp_payment_status: {
        type: String,
        enum: RAZORPAY_PAYMENT_STATUS,
        default: "UNPAID",
      },
      currency: { type: String, enum: ALLOWED_CURRENCIES, default: "INR" },
    },

    order_result: {
      order_status: { type: String, enum: ORDER_STATUS, default: "PENDING" },
      price: { type: Number, required: true, default: 0 },
      discount: { type: Number, required: true, default: 0 },
      charges: { type: Number, default: 0 },
      paid_at: { type: Date },
      delivered_at: { type: Date },
      cancelled_at: { type: Date },
      returned_at: { type: Date },
      order_receipt: { type: String, unique: true },
    },

    payment_details: {
      method: { type: String, enum: RAZORPAY_PAYMENT_METHODS },
      refund_status: { type: String },
      bank: { type: String },
      wallet: { type: String },
      email: { type: String },
      contact: { type: String },
      fee: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      upi: upiSchema,
      netbanking: netbankingSchema,
      card: cardSchema,
    },
    totalPrice: { type: String, require: true },
  },

  { timestamps: true, versionKey: false }
);

export const Order = model<IOrder>("Order", orderSchema);
