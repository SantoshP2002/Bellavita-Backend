import { Router } from "express";
import { registerController } from "../controllers/register";
import { ResponseMiddleware, ZodMiddleware } from "../../../middlewares";
import { loginZodSchema, registerZodSchema } from "../validations";
import { loginController } from "../controllers";

export const router = Router();

router.post(
  "/register",
  ZodMiddleware.validateZodSchema(registerZodSchema),
  ResponseMiddleware.catchAsync(registerController)
);
router.post(
  "/login",
  ZodMiddleware.validateZodSchema(loginZodSchema),
  ResponseMiddleware.catchAsync(loginController)
);
