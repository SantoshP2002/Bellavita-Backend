import { NextFunction, Request, Response } from "express";
import { AppSuccess } from "../../../classes";

declare module "express-serve-static-core" {
  interface Response {
    success: (statusCode: number, message: string, data?: object) => void;
  }
}

export const success = (_: Request, res: Response, next: NextFunction) => {
  res.success = (statusCode: number, message: string, data: object = {}) => {
    const response = new AppSuccess(statusCode, message, data);

    res.status(statusCode).json({
      success: true,
      error: false,
      ...response,
    });
  };

  next();
};
