import { Router } from "express";
import { ResponseMiddleware } from "../../../middlewares";
import { getUserController } from "../controllers";

export const router = Router();

router.get("/user", ResponseMiddleware.catchAsync(getUserController));
