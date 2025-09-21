import { Router } from "express";
import { AuthMiddleware, ResponseMiddleware } from "../../../middlewares";
import { getCartController } from "../controller";

export const router = Router();

// Get cart
router.get(
  "/cart",
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(getCartController)
);
