import { Response } from "express";
import bcrypt from "bcrypt";
import { AuthenticatedRequest } from "../../../types";
import { User } from "../../user/models";
import { AppError } from "../../../classes";

export const changePasswordController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?._id;
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(userId).select("+password");
  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    throw new AppError("Incorrect current Password", 400);
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.success(202, "Password Update Successfully");
};
