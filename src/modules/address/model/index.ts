import { model, Schema } from "mongoose";
import { IAddress, IUserAddress } from "../types";
import { ALLOW_COUNTRIES } from "../constants";

// Address Schema
export const addressSchema = new Schema<IAddress>(
  {
    address: { type: String, required: true },
    landmark: { type: String , default: ""},
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true, minlength: 6, maxlength: 6 },
    country: {
      type: String,
      required: true,
      enum: ALLOW_COUNTRIES,
      default: "India",
    },
    altPhoneNumber: { type: String, default:""},
    phoneNumber: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, versionKey: false }
);

// Address Model
export const Address = model<IAddress>("Address", addressSchema);

// User Address Schema
export const userAddressSchema = new Schema<IUserAddress>(
  {
    addresses: {
      type: [{ type: Schema.Types.ObjectId, ref: "Address" }],
      default: [],
      validate: {
        validator: function (addresses) {
          return addresses.length <= 5;
        },
        message:
          "You can add max 5 addresses only. Remove some addresses to add more.",
      },
    },
    defaultAddress: { type: Schema.Types.ObjectId, ref: "Address" },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, versionKey: false }
);

// User Address Model
export const UserAddress = model<IUserAddress>(
  "User-Address",
  userAddressSchema
);
