import { Router } from "express";
import { registerController } from "../controllers/register";
import {
  MulterMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
  ZodMiddleware,
} from "../../../middlewares";
import { loginZodSchema, registerZodSchema } from "../validations";
import { loginController } from "../controllers";

export const router = Router();

router.post(
  "/register",
  MulterMiddleware.validateFiles({ type: "single", fieldName: "profilePic" }),
  RequestMiddleware.checkEmptyRequest({ body: true}),
  ZodMiddleware.validateZodSchema(registerZodSchema),
  ResponseMiddleware.catchAsync(registerController)
);
router.post(
  "/login",
  RequestMiddleware.checkEmptyRequest({ body: true }),
  ZodMiddleware.validateZodSchema(loginZodSchema),
  ResponseMiddleware.catchAsync(loginController)
);
