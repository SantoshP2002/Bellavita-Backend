import { Router } from "express";
import {
  AuthMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
  ZodMiddleware,
} from "../../../middlewares";
import { addAddressController } from "../controller";
import { addZodSchema, updateZodSchema } from "../validation";
import { getUserAddressController } from "../controller/getUserAddress";
import { updateAddressController } from "../controller/updateAddress";

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

// update address
router.patch(
  "/update/:addressId",
  RequestMiddleware.checkEmptyRequest({ body: true, params: true }),
  ZodMiddleware.validateZodSchema(updateZodSchema),
  ResponseMiddleware.catchAsyncWithTransaction(updateAddressController)
);
