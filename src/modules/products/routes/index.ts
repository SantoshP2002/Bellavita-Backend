import { Router } from "express";
import { ResponseMiddleware } from "../../../middlewares";
import {
  createProductsController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from "../controller";

export const router = Router();

router.get(
  "/get-products",
  ResponseMiddleware.catchAsync(getAllProductsController)
);
router.post(
  "/create-products",
  ResponseMiddleware.catchAsync(createProductsController)
);
router.get(
  "/get-product/:id",
  ResponseMiddleware.catchAsync(getProductByIdController)
);
router.put(
  "/update-product/:id",
  ResponseMiddleware.catchAsync(updateProductController)
);
