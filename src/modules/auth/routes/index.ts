import { Router } from "express";
import { registerController } from "../controllers/register";
import { ResponseMiddleware, ZodMiddleware } from "../../../middlewares";
import { registerZodSchema } from "../validations";

export const router = Router();

router.post(
  "/register",
  ZodMiddleware.validateZodSchema(registerZodSchema),
  ResponseMiddleware.catchAsync(registerController)
);
