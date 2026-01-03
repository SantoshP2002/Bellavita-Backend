import { Request } from "express";
import { AuthModule } from "../..";
import { User } from "../models";
import { AppError } from "../../../classes";
import { Types } from "mongoose";
import { IUser } from "../types";

export const getUserByToken = async (req: Request, needPassword?: boolean) => {
  const userId = AuthModule.Services.getUserIdFromToken(req);

  let user;

  if (needPassword) {
    user = await User.findById(userId);
  } else {
    user = await User.findById(userId).select("-password");
  }

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  return user;
};

export const getUserById = async (
  userId: string | Types.ObjectId,
  needPassword?: boolean
) => {
  let user = null;

  if (needPassword) {
    user = await User.findById(userId);
  } else {
    user = await User.findById(userId).select("-password");
  }

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  return user;
};

export const getUserByEmail = async (email: string, needError?: boolean) => {
  const user = await User.findOne({ email });

  console.log("user11111111111111", user)

  if (!user && needError !== false) {
    throw new AppError(`User not found with ${email}`, 404);
  }

  return user as IUser;
};
