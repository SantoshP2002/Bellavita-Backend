import { NextFunction, Request, Response } from "express";
import { Error as MongooseError } from "mongoose";

import { AppError } from "../../../classes";
import { IS_DEV } from "../../../env";

const sendDevError = (err: AppError, res: Response): void => {
  res.status(err.statusCode || 500).json({
    success: false,
    error: true,
    message: err.message,
    statusCode: err.statusCode || 500,
    stack: err.stack,
  });
};

const sendProdError = (err: AppError, res: Response): void => {
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      success: false,
      error: true,
      message: err.message,
      statusCode: err.statusCode || 500,
    });
  } else {
    res.status(500).json({
      success: false,
      error: true,
      message: "Something went wrong!",
      statusCode: 500,
    });
  }
};

export const error = (
  err: Error | AppError | MongooseError,
  _: Request,
  res: Response,
  __: NextFunction
): void => {
  const error =
    err instanceof AppError
      ? err
      : new AppError(
          IS_DEV === "true"
            ? err.message ?? "Internal Server Error!"
            : "Internal Server Error!",
          500,
          false
        );

  error.statusCode ||= 500;
  error.isOperational ??= false;

  if (IS_DEV === "true") {
    return sendDevError(error, res);
  } else {
    return sendProdError(error, res);
  }
};
