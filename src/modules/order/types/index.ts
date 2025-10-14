import { Types } from "mongoose";
import { AddressModule, CartProductModule } from "../..";
import {
  ALLOWED_CURRENCIES,
  ALLOWED_PAYMENT_MODE,
  ORDER_STATUS,
  RAZORPAY_PAYMENT_METHODS,
  RAZORPAY_PAYMENT_STATUS,
} from "../constants";

export interface IOrder {
  user: Types.ObjectId;
  products: CartProductModule.ITypes.IPopulatedCartProduct[];
  totalPrice: Number;
  address: Omit<AddressModule.AType.IAddress, "user">;

  razorpay_payment_result: {
    payment_mode: (typeof ALLOWED_PAYMENT_MODE)[number];
    currency: (typeof ALLOWED_CURRENCIES)[number];
    rzp_order_id: string;
    rzp_payment_id: string;
    rzp_signature: string;
    rzp_payment_status: (typeof RAZORPAY_PAYMENT_STATUS)[number];
  };

  order_result: {
    order_status: (typeof ORDER_STATUS)[number];
    price: number;
    order_receipt: string;
    paid_at?: Date;
    delivered_at?: Date;
    cancelled_at?: Date;
    returned_at?: Date;
  };

  payment_details?: {
    method: (typeof RAZORPAY_PAYMENT_METHODS)[number];
    refund_status?: string | null;
    bank?: string | null;
    wallet?: string | null;
    email: string;
    contact: string;
    fee: number;
    tax: number;
    upi?: {
      acquirer_data: { rrn: string; upi_transaction_id: string; vpa: string };
    };
    netbanking?: { acquirer_data: { bank_transaction_id: string } };
    card?: {
      token_id: string;
      acquirer_data: { auth_code: string };
      card: {
        id?: string;
        name?: string;
        last4: string;
        network: string;
        type: string;
        issuer: string;
      };
    };
  };
}
