import { NextFunction, Response } from "express";
import { AuthenticatedRequest, AuthorizedRequest } from "../../types";
import { AuthModule, UserModule } from "../../modules";
import { isValidMongoId } from "../../utils";
import { AppError } from "../../classes";

export const authenticated = async (
  req: AuthenticatedRequest,
  _: Response,
  next: NextFunction
) => {
  try {
    const userId = AuthModule.Services.getUserIdFromToken(req);

    isValidMongoId(userId, "Invalid userId");

    const user = await UserModule.Services.getUserById(userId);

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const authorized =
  (allowedRoles: UserModule.ITypes.TUserRole[]) =>
  async (req: AuthorizedRequest, _: Response, next: NextFunction) => {
    try {
      const userId = AuthModule.Services.getUserIdFromToken(req);

      isValidMongoId(userId, "Invalid userId", 400);

      const user = await UserModule.Services.getUserById(userId);

      if (!allowedRoles.includes(user.role)) {
        throw new AppError("Unauthorized", 401);
      }

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
