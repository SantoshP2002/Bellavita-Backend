import { Router } from "express";
import {
  AuthMiddleware,
  MulterMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
  ZodMiddleware,
} from "../../../middlewares";
import { uploadImageZodSchema } from "../validation";
import {
  uploadMultipleImagesController,
  uploadSingleImageController,
} from "../controllers";

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
  RequestMiddleware.checkEmptyRequest({ file: true, fileOrBody: true }),
  ZodMiddleware.validateZodSchema(uploadImageZodSchema),
  ResponseMiddleware.catchAsync(uploadSingleImageController)
);

// Multiple Image Upload
router.post(
  "images/upload",
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

