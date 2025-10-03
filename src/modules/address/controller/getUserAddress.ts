import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { UserAddress } from "../model";

export const getUserAddressController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req?.user?._id;

  const userAddress = await UserAddress.findOne({ user: userId }).populate(
    "addresses"
  );

  res.success(200, "User address fetched successfully", { userAddress });
};
