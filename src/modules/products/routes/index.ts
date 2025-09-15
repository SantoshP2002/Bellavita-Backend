import { Router } from "express";
import {
  AuthMiddleware,
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
import { validate } from "../../../middlewares/product/validate";
import { createProductZodSchema, updateProductZodSchema } from "../validation";
import { validateFiles } from "../../../middlewares/multer";

export const router = Router();

// Get all products
router.get("/", ResponseMiddleware.catchAsync(getAllProductsController));

// Create product
router.post(
  "/create",
  AuthMiddleware.authorized(["ADMIN"]),
  validate(createProductZodSchema),
  MulterMiddleware.validateFiles({
    type: "fields",
    fieldsConfig: [{ name: "productImages", maxCount: 8 }],
  }),
  ResponseMiddleware.catchAsync(createProductsController)
);
// Get By Id
router.get("/:id", ResponseMiddleware.catchAsync(getProductByIdController));

// Update product
router.patch(
  "/:id",
  validateFiles({
    type: "fields",
    fieldsConfig: [{ name: "productImages", maxCount: 8 }],
  }),
  validate(updateProductZodSchema),
  ResponseMiddleware.catchAsync(updateProductController)
);

// Delete product
router.delete(
  "/:id",
  ResponseMiddleware.catchAsync(deleteProductByIdController)
);
