import { Router } from "express";
import {
  AuthMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
  ZodMiddleware,
} from "../../../middlewares";
import { addProductToCartController } from "../controllers";
import { updateProductCartQuantityController } from "../controllers/updateProductCartQuantity";
import { quantityZodSchema } from "../validation";
import { removeProductToCartController } from "../controllers/removeProductToCart";

export const router = Router();

router.post(
  "/add/:productId",
  AuthMiddleware.authenticated,
  RequestMiddleware.checkEmptyRequest({ params: true }),
  ResponseMiddleware.catchAsync(addProductToCartController)
);
router.patch(
  "/update/:cartProductId",
  AuthMiddleware.authenticated,
  RequestMiddleware.checkEmptyRequest({ params: true }),
  ZodMiddleware.validateZodSchema(quantityZodSchema),
  ResponseMiddleware.catchAsync(updateProductCartQuantityController)
);

router.delete(
  "/remove/:cartProductId",
  AuthMiddleware.authenticated,
  RequestMiddleware.checkEmptyRequest({ params: true }),
  ResponseMiddleware.catchAsyncWithTransaction(removeProductToCartController)
);
