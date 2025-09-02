import { Request, Response } from "express";
import { AppError } from "../../../classes";
import { User } from "../../user/models";
import bcrypt from "bcrypt";
import { generateToken } from "../services";

export const registerController = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, profilePic } = req.body ?? {};

  const userDetails = await User.findOne({ email });
  if (userDetails) {
    throw new AppError("User already registered", 400);
  }

  // Hash password
  const hashPassword = bcrypt.hashSync(password, 10);

  if (!hashPassword) {
    throw new AppError("Failed to hash password", 500);
  }

  // Create new user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashPassword,
    profilePic: profilePic ?? "",
  });
  await user.save();

  // Token
  const token = generateToken(user._id);
  res.success(201, "User Registered Successfully", {
    token,
    user,
  });
};
