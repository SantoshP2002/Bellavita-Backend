import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../user/models";
import { generateToken } from "../services";

export const loginController = async (_req: Request, res: Response) => {
  const { email, password } = _req.body ?? {};

  const userDetails = await User.findOne({ email });
  if (!userDetails) {
    throw new Error("User not found");
  }

  // MatchPassword
  const matchPassword = await bcrypt.compare(password, userDetails.password);
  if (!matchPassword) {
    throw new Error("Invalid credentials");
  }

  // Token
  const token = generateToken(userDetails._id.toString());
  res.success(200, "User Logged In Successfully", { user: userDetails, token });
};
