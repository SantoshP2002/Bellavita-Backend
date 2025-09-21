import { Router } from "express";
import {
  AuthMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
} from "../../../middlewares";
import { addToCartController } from "../controller";

export const router = Router();

// Create cart and add product to cart
router.post(
  "/add/:productId",
  AuthMiddleware.authenticated,
  RequestMiddleware.checkEmptyRequest({ params: true }),
  ResponseMiddleware.catchAsync(addToCartController)
);
