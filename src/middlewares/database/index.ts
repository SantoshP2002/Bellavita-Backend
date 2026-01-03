import { NextFunction, Request, Response } from "express";
import { connectDB } from "../../configs";


export const checkConnection = async (
  _: Request,
  __: Response,
  next: NextFunction
) => {
  try {
    await connectDB();

    next();
  } catch (error) {
    console.error("❌ Database connection middleware error:", error);
    // Forward the error to global error handler
    next(error);
  }
};
