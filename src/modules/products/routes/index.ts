import { Router } from "express";
import {
  AuthMiddleware,
  JSONParseMiddleware,
  MulterMiddleware,
  ResponseMiddleware,
} from "../../../middlewares";
import {
  createProductsController,
  deleteProductByIdController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} from "../controller";
import { getMyProductsController } from "../controller/getMyProduct";

export const router = Router();

// Get all products
router.get("/", ResponseMiddleware.catchAsync(getAllProductsController));

// Create product
router.post(
  "/create",
  AuthMiddleware.authorized(["ADMIN"]),
  MulterMiddleware.validateFiles({
    type: "fields",
    fieldsConfig: [{ name: "images", maxCount: 8 }],
  }),
  JSONParseMiddleware.JSONParse({ fieldsToParse: ["category", "subCategory"] }),
  ResponseMiddleware.catchAsync(createProductsController)
);


// get My Product
router.get(
  "/my-products",
  AuthMiddleware.authorized(["ADMIN"]),
  ResponseMiddleware.catchAsync(getMyProductsController)
);

// Get By Id
router.get("/:id", ResponseMiddleware.catchAsync(getProductByIdController));


// Update product
router.patch(
  "/:id",
  MulterMiddleware.validateFiles({
    type: "fields",
    fieldsConfig: [{ name: "images", maxCount: 8 }],
  }),
  JSONParseMiddleware.JSONParse({ fieldsToParse: ["category", "subCategory"] }),
  ResponseMiddleware.catchAsync(updateProductController)
);

// Delete product
router.delete(
  "/:id",
  ResponseMiddleware.catchAsync(deleteProductByIdController)
);
