import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { ClientSession } from "mongoose";
import { isValidMongoId } from "../../../utils";
import { Address, UserAddress } from "../model";
import { AppError } from "../../../classes";

export const deleteAddressController = async (
  req: AuthenticatedRequest,
  res: Response,
  _: NextFunction,
  session: ClientSession
) => {
  const userId = req?.user?._id;
  const { addressId } = req.params;

  isValidMongoId(addressId, "Invalid Address Id provided", 404);

  const userAddress = await UserAddress.findOne({ user: userId }).session(
    session
  );

if (!userAddress) {
    throw new AppError("User address not found to delete", 404);
  }
  const isDefaultAddress =
    userAddress?.defaultAddress?.toString() === addressId;
  // Direct Delete
  const deleteAddress = await Address.findByIdAndDelete(addressId).session(
    session
  );

  if (!deleteAddress) {
    throw new AppError("Failed to delete address", 401);
  }

  if (isDefaultAddress) {
    const updateUserAddresses = await UserAddress.findOneAndUpdate(
      { user: userId },
      { $set: { defaultAddress: null }, $pull: { addresses: addressId } },
      { new: true, session }
    );

    if (!updateUserAddresses) {
      throw new AppError("Failed to delete address", 401);
    }
  }

  res.success(202, "Address Deleted Successfully");
};
