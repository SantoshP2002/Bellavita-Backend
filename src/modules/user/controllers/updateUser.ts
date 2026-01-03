import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { User } from "../models";
import { AppError } from "../../../classes";

export const updateUserController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?._id;

  const update = req.body;

  console.log("update", update);

  const updateUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  });

  if (!updateUser) {
    throw new AppError("User Not Found update user", 404);
  }
  const { password: _, ...restUser } = updateUser?.toObject() ?? {};
  res.success(202, "User Updated Successfully", { user: restUser });
};
