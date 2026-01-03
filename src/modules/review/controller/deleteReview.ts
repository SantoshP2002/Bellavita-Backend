import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { AppError } from "../../../classes";
import {
  checkUserPermission,
  isValidMongoId,
  multipleImagesRemover,
} from "../../../utils";
import { ProductModule } from "../..";
import { Review } from "../schema";

export const deleteReviewController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { productId, reviewId } = req.params;

  if (!productId || !reviewId) {
    throw new AppError("Product ID and Review Id are Both Required", 404);
  }

  isValidMongoId(productId, "Invalid Product ID Provided", 404);
  isValidMongoId(reviewId, "Invalid Review ID Provided", 404);

  const product = await ProductModule.Models.Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found in Delete Review", 404);
  }

  product.reviews = product.reviews.filter((id) => id.toString() !== reviewId);

  const review = await Review.findByIdAndDelete(reviewId).lean();
  if (!review) {
    throw new AppError("Review Not Found In Delete Review", 404);
  }

  if (req.user?.role !== "ADMIN") {
    checkUserPermission({
      checkId: review.user,
      userId: req.user?._id as string,
      message: "You are not authorized to delete this review",
      statusCode: 403,
    });
  }

  const imageUrl = review.images;
  if (imageUrl.length) {
    await multipleImagesRemover(imageUrl);
  }

  res.success(200, "Review Deleted Successfully");
};
