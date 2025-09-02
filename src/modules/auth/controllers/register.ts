import { Request, Response } from "express";
import { AppError } from "../../../classes";
import { User } from "../../user/models";
import bcrypt from "bcrypt";
import { generateToken } from "../services";
import { singleImageUploader } from "../../../utils";

export const registerController = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body ?? {};

  const userDetails = await User.findOne({ email });
  if (userDetails) {
    throw new AppError("User already registered", 400);
  }

  // Hash password
  const hashPassword = bcrypt.hashSync(password, 10);

  if (!hashPassword) {
    throw new AppError("Failed to hash password", 500);
  }

  const file = req.file;

  let profilePic = "";

  if (file) {
    const cldResp = await singleImageUploader({ file, folder: "Profile_Pic" });

    profilePic = cldResp?.secure_url;
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

  if (!user) {
    throw new AppError("Failed to register user", 500);
  }

  // Token
  const token = generateToken(user._id);
  res.success(201, "User Registered Successfully", {
    token,
    user,
  });
};
