import { Router } from "express";
import {
  AuthMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
} from "../../../middlewares";
import { addProductToCartController } from "../controllers";

export const router = Router();

router.post(
  "/add/:productId",
  AuthMiddleware.authenticated,
  RequestMiddleware.checkEmptyRequest({ params: true }),
  ResponseMiddleware.catchAsync(addProductToCartController)
);
