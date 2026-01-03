import { Router } from "express";
import {
  AuthMiddleware,
  MulterMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
  ZodMiddleware,
} from "../../../middlewares";
import {
  removeMultipleImagesZodSchema,
  removeSingleImageZodSchema,
  uploadImageZodSchema,
} from "../validation";
import {
  removeSingleImageController,
  uploadMultipleImagesController,
  uploadSingleImageController,
} from "../controllers";
import { removeMultipleImageController } from "../controllers/removeMultipleImages";

export const router = Router();

// =======Image Upload =======
// Single Image Upload
router.post(
  "/image/upload",
  AuthMiddleware.authorized(["ADMIN", "USER"]),
  MulterMiddleware.validateFiles({
    type: "single",
    fieldName: "image",
  }),
  RequestMiddleware.checkEmptyRequest({ file: true }),
  ZodMiddleware.validateZodSchema(uploadImageZodSchema),
  ResponseMiddleware.catchAsync(uploadSingleImageController)
);

// Multiple Image Upload
router.post(
  "/images/upload",
  AuthMiddleware.authorized(["ADMIN", "USER"]),
  MulterMiddleware.validateFiles({
    type: "array",
    fieldName: "images",
  }),
  RequestMiddleware.checkEmptyRequest({
    files: true,
    body: true,
  }),
  ZodMiddleware.validateZodSchema(uploadImageZodSchema),
  ResponseMiddleware.catchAsync(uploadMultipleImagesController)
);

// single image Remove
router.delete(
  "/image/delete",
  RequestMiddleware.checkEmptyRequest({ body: true }),
  AuthMiddleware.authorized(["ADMIN", "USER"]),
  ZodMiddleware.validateZodSchema(removeSingleImageZodSchema),
  ResponseMiddleware.catchAsync(removeSingleImageController)
);

// multiple image remove
router.delete(
  "/images/delete",
  RequestMiddleware.checkEmptyRequest({ body: true }),
  AuthMiddleware.authorized(["ADMIN", "USER"]),
  ZodMiddleware.validateZodSchema(removeMultipleImagesZodSchema),
  ResponseMiddleware.catchAsync(removeMultipleImageController)
);
