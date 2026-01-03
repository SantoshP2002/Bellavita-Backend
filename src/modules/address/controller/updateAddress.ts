import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { isValidMongoId } from "../../../utils";
import { ClientSession } from "mongoose";
import { Address, UserAddress } from "../model";
import { AppError } from "../../../classes";

export const updateAddressController = async (
  req: AuthenticatedRequest,
  res: Response,
  _: NextFunction,
  session: ClientSession
) => {
  const userId = req?.user?._id;
  const { addressId } = req.params;

  isValidMongoId(addressId, "Invalid Address Id provided", 404);

  const { isDefaultAddress, ...restBody } = req.body ?? {};

  const [updateAddress, updateUserAddress] = await Promise.all([
    Address.findByIdAndUpdate(
      { _id: addressId, user: userId },
      { $set: { ...restBody } },
      { new: true, session }
    ),
    isDefaultAddress
      ? UserAddress.findByIdAndUpdate(
          { user: userId },
          { $set: { defaultAddress: addressId } },
          { new: true, session }
        )
      : Promise.resolve(null),
  ]);

  if (!updateAddress) {
    throw new AppError("User Not Found", 400);
  }

  if (!updateUserAddress && isDefaultAddress) {
    throw new AppError("User Address Not Found", 400);
  }
  res.success(200, "Address Updated Successfully");
};
