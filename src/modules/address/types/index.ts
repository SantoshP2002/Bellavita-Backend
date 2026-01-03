import {  Types } from "mongoose";
import { UserModule } from "../..";
import { ALLOW_COUNTRIES } from "../constants";

export interface IAddress
  extends Pick<UserModule.ITypes.IUser, "firstName" | "lastName" | "email"> {
  user: Types.ObjectId;
  phoneNumber: string;
  altPhoneNumber?: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pinCode: string;
  country: (typeof ALLOW_COUNTRIES)[number];
}

export interface IUserAddress  {
  user: Types.ObjectId;
  addresses: Types.ObjectId[];
  defaultAddress: Types.ObjectId;
}
