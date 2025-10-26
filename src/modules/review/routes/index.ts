import { Router } from "express";
import {
  AuthMiddleware,
  JSONParseMiddleware,
  MulterMiddleware,
  RequestMiddleware,
  ResponseMiddleware,
  ZodMiddleware,
} from "../../../middlewares";
import { createReviewController, deleteReviewController } from "../controller";
import { createReviewZodSchema, updateReviewZodSchema } from "../validations";
import { updateReviewController } from "../controller/updateReview";
import { getReviewsByProductIdController } from "../controller/getReviewByProductId";

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

// Delete Review (reviewId, productId)
router.delete(
  "/:productId/:reviewId",
  RequestMiddleware.checkEmptyRequest({ params: true }),
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(deleteReviewController)
);

// get By Product ID
router.get(
  "/:productId",
  RequestMiddleware.checkEmptyRequest({ params: true }),
  ResponseMiddleware.catchAsync(getReviewsByProductIdController)
);
