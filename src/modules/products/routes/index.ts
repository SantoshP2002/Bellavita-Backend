import { Router } from "express";
import { MulterMiddleware, ResponseMiddleware } from "../../../middlewares";
import {
  createProductsController,
  deleteProductByIdController,
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
  "/create-product",
  MulterMiddleware.validateFiles({
    type: "fields",
    fieldsConfig: [{ name: "productImages",maxCount:8 }],
  }),
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
router.delete(
  "/delete-product/:id",
  ResponseMiddleware.catchAsync(deleteProductByIdController)
);
