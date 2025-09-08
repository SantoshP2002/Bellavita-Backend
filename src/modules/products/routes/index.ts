import { Router } from "express";
import { ResponseMiddleware } from "../../../middlewares";
import { getProductsController } from "../controller";

export const router = Router()

router.get("/get-products", ResponseMiddleware.catchAsync(getProductsController))