import { Router } from "express";
import {
  AuthMiddleware,
  JSONParseMiddleware,
  MulterMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
  ZodMiddleware,
} from "../../../middlewares";
import { createReviewController } from "../controller";
import { createReviewZodSchema, updateReviewZodSchema } from "../validations";
import { updateReviewController } from "../controller/updateReview";

export const router = Router();

// create Review
router.post(
  "/:productId",
  MulterMiddleware.validateFiles({
    type: "fields",
    fieldsConfig: [{ name: "images", maxCount: 5 }],
  }),
  RequestMiddleware.checkEmptyRequest({ params: true, body: true }),
  AuthMiddleware.authenticated,
  ZodMiddleware.validateZodSchema(createReviewZodSchema),
  ResponseMiddleware.catchAsync(createReviewController)
);

// update Review (reviewId, productId)
router.patch(
  "/:productId/:reviewId",
  MulterMiddleware.validateFiles({
    type: "fields",
    fieldsConfig: [{ name: "images", maxCount: 5 }],
  }),
  RequestMiddleware.checkEmptyRequest({ filesOrBody: true }),
  AuthMiddleware.authenticated,
  JSONParseMiddleware.JSONParse({
    fieldsToParse: ["removedImages"],
  }),
  ZodMiddleware.validateZodSchema(updateReviewZodSchema),
  ResponseMiddleware.catchAsync(updateReviewController)
);
