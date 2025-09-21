import { Router } from "express";
import {
  AuthMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
} from "../../../middlewares";
import { addToCartController, getCartController } from "../controller";

export const router = Router();

// Create cart and add product to cart
router.post(
  "/add/:productId",
  AuthMiddleware.authenticated,
  RequestMiddleware.checkEmptyRequest({ params: true }),
  ResponseMiddleware.catchAsync(addToCartController)
);

// Get cart
router.get(
  "/cart",
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(getCartController)
);

// Update Cart Product Quantity
// router.patch(
//   "/update/:productId",
//   AuthMiddleware.authenticated,
//   RequestMiddleware.checkEmptyRequest({ params: true }),
//   ResponseMiddleware.catchAsync(updateCartController)
// );