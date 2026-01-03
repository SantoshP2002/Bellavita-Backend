import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { isValidMongoId } from "../../../utils";
import { FilterQuery, Types } from "mongoose";
import { ReviewProps } from "../types";
import { Review } from "../schema";

export const getReviewsByProductIdController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { productId } = req.params;

  isValidMongoId(productId, "Invalid Product Id provided", 404);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const imageOnly = req.query.imageOnly === "true";

  const filters: FilterQuery<ReviewProps> = {
    product: new Types.ObjectId(productId),
    ...(imageOnly
      ? { images: { $exists: true, $type: "array", $ne: [] } }
      : {}),
  };

  // total Review count
  const totalReview = await Review.countDocuments(filters);

  // Review fetch with pagination
  const reviews = await Review.find(filters)
    .populate("user", "firstName lastName profilePic") // optional
    .sort({ createdAt: -1 }) // newest first
    .skip(skip)
    .limit(limit)
    .lean();

  if (!reviews.length) {
    return res.success(200, "No reviews found for this product", {
      reviews: [],
      pagination: { totalReview: 0 },
    });
  }

  // Response Data
  res.success(200, "Image review fetch Successfully", {
    reviews,
    pagination: {
      totalReview,
      currentPage: page,
      totalPage: Math.ceil(totalReview / limit),
      perPage: limit,
      hasNextPage: page * limit < totalReview,
      hasPrevPage: page > 1,
    },
  });
};
