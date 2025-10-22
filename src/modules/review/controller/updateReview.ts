import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { AppError } from "../../../classes";
import {
  isValidMongoId,
  multipleImagesRemover,
  multipleImagesUploader,
} from "../../../utils";
import { Review } from "../schema";
import { possibleUpdateReviewFields } from "../constants";

export const updateReviewController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { productId, reviewId } = req?.params;

  if (!productId) {
    throw new AppError("productId is required", 404);
  }

  if (!reviewId) {
    throw new AppError("Review Id is required", 404);
  }

  isValidMongoId(productId, "Invalid Product Id provided", 404);
  isValidMongoId(reviewId, "Invalid Review Id provided", 404);

  const body = req.body;
  const { productTitle, removedImages } = req.body ?? {};

  let uploadImages: string[] = [];

  const files = req.files as { [fieldName: string]: Express.Multer.File[] };

  const images = files?.images;

  if (images?.length && !productTitle) {
    throw new AppError("Product Title is required when uploading images", 404);
  }

  const review = await Review.findById(reviewId);

  if (!review) {
    throw new AppError("Review Not Found", 404);
  }

  if (removedImages?.length) {
    review.images =
      review.images?.filter((img) => !removedImages.include(img)) ?? [];
    await multipleImagesRemover(removedImages);
  }

  if (files) {
    if (images?.length) {
      const imgResult = await multipleImagesUploader({
        files: images,
        folder: `Reviews/${productTitle}`,
        // cloudinaryConfigOption: "image",
      });
      uploadImages = imgResult.map((img) => img.secure_url);
      review?.images.push(...uploadImages);
    }
  }

  for (const field of possibleUpdateReviewFields) {
    const value = body[field];
    if (value && value !== undefined && value !== null) {
      (review[field] as unknown) = value;
    }
  }

  try {
    await review.save({ validateBeforeSave: false });
  } catch (error) {
    if (uploadImages.length) {
      await multipleImagesRemover(uploadImages);
    }
    throw error;
  }

  res.success(200, "Review Updated Successfully", { review });
};
