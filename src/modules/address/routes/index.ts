import { Router } from "express";
import {
  AuthMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
  ZodMiddleware,
} from "../../../middlewares";
import { addAddressController } from "../controller";
import { addZodSchema } from "../validation";
import { getUserAddressController } from "../controller/getUserAddress";

export const router = Router();

// add Address
router.post(
  "/add",
  AuthMiddleware.authenticated,
  RequestMiddleware.checkEmptyRequest({ body: true }),
  ZodMiddleware.validateZodSchema(addZodSchema),
  ResponseMiddleware.catchAsyncWithTransaction(addAddressController)
);

// get user address
router.get(
  "/",
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(getUserAddressController)
);
