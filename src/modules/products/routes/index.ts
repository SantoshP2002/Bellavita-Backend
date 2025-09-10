import { Router } from "express";
import { ResponseMiddleware } from "../../../middlewares";
import { createProductsController, getAllProductsController, } from "../controller";

export const router = Router();

router.get(
  "/get-products",
  ResponseMiddleware.catchAsync(getAllProductsController)
);
router.post(
  "/create-products",
  ResponseMiddleware.catchAsync(createProductsController)
);
