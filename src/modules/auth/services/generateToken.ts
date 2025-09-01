import jwt from "jsonwebtoken";
import { AppError } from "../../../classes";
import { JWT_SECRET } from "../../../env";

import { Types } from "mongoose";

export const generateToken = (userId: Types.ObjectId | string): string => {
  if (!JWT_SECRET) {
    throw new AppError("JWT secret not defined", 500);
  }

  try {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1d" });

    if (!token) {
      throw new AppError("Failed to generate token", 500);
    }

    return token;
  } catch (error) {
    throw error;
  }
};
