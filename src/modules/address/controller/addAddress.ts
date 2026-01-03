import { NextFunction, Response } from "express";
import { ClientSession } from "mongoose";

import { Address, UserAddress } from "../model";
import { AuthenticatedRequest } from "../../../types";
import { AppError } from "../../../classes";

export const addAddressController = async (
  req: AuthenticatedRequest,
  res: Response,
  _: NextFunction,
  session: ClientSession
) => {
  const userId = req.user?._id;

  const { idDefaultAddress, ...restBody } = req.body ?? {};

  const userAddress = await UserAddress.findOneAndUpdate(
    { user: userId },
    { $setOnInsert: { user: userId, addresses: [], defaultAddress: null } },
    { new: true, upsert: true, session }
  );

  if (!userAddress) {
    throw new AppError("User Address Not Found", 404);
  }

  const address = new Address({ ...restBody, user: userId });
  try {
    await address.save({ session });
  } catch (error) {
    console.log("ERROR", error);
    throw new AppError("Failed To Add Address", 400);
  }

  userAddress.addresses.push(address._id);
  if (idDefaultAddress || !userAddress.defaultAddress)
    userAddress.defaultAddress = address._id;

  await userAddress.save({ session });
  res.success(201, "Address Added Successfully", { userId });
};
