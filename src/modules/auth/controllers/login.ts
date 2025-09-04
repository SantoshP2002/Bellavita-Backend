import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModule } from "../..";
import { generateToken } from "../services";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body ?? {};

  const user = await UserModule.Services.getUserByEmail(email);

  // MatchPassword
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid credentials");
  }

  // Token
  const token = generateToken(user._id?.toString());
  res.success(200, "User Logged In Successfully", { user, token });
};
