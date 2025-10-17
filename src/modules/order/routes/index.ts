import { Router } from "express";
import {
  AuthMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
} from "../../../middlewares";
import { createOrderController } from "../controllers/createOrder";
import { verifyPaymentController } from "../controllers";
import { getOrderController } from "../controllers/getOrder";
import { getByIdOrderController } from "../controllers/getIdOrder";

export const router = Router();

// create Order
router.post(
  "/create",
  RequestMiddleware.checkEmptyRequest({ query: true }),
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(createOrderController)
);

router.patch(
  "/verify-payment",
  RequestMiddleware.checkEmptyRequest({ body: true }),
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(verifyPaymentController)
);

router.get(
  "/",
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(getOrderController)
);
router.get(
  "/:orderId",
  RequestMiddleware.checkEmptyRequest({ params: true }),
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(getByIdOrderController)
);
