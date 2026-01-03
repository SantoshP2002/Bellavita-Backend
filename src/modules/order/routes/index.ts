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
import { cancelPaymentController } from "../controllers/cancelPayment";
import { getAdminOrderController } from "../controllers/getAdminOrder";

export const router = Router();

// create Order
router.post(
  "/create",
  RequestMiddleware.checkEmptyRequest({ query: true }),
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(createOrderController)
);

// update order in verify-payment
router.patch(
  "/verify-payment",
  RequestMiddleware.checkEmptyRequest({ body: true }),
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(verifyPaymentController)
);

// get order user
router.get(
  "/",
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(getOrderController)
);

// update order user by ID
router.patch(
  "/cancel-payment/:orderId",
  RequestMiddleware.checkEmptyRequest({ params: true }),
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(cancelPaymentController)
);

// get Admin Orders
router.get(
  "/admin-order",
  AuthMiddleware.authorized(["ADMIN"]),
  ResponseMiddleware.catchAsync(getAdminOrderController)
);

// get order user by ID
router.get(
  "/:orderId",
  RequestMiddleware.checkEmptyRequest({ params: true }),
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(getByIdOrderController)
);
