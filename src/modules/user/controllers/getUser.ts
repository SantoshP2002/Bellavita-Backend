import { Request, Response } from "express";
import { AuthModule } from "../..";
import { User } from "../models";
import { AppError } from "../../../classes";

export const getUserController = async (req: Request, res: Response) => {
  const userId = AuthModule.Services.getUserIdFromToken(req);

  const user = await User.findById(userId).select("-password").lean().exec();

  if (!user) {
    throw new AppError("User not found", 404);
  }

  res.success(200, "User found successfully", { user });
};
