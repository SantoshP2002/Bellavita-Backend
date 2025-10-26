import { Response } from "express";
import { AuthenticatedRequest } from "../../../types";
import { AppError } from "../../../classes";
import {
  isValidMongoId,
  multipleImagesRemover,
  multipleImagesUploader,
} from "../../../utils";
import { ProductModule } from "../..";
import { Review } from "../schema";

export const createReviewController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { productId } = req?.params;

  if (!productId) {
    throw new AppError("Product Id Not Found In Create Review", 404);
  }

  isValidMongoId(productId, "Invalid Product Id provided", 404);

  const body = req.body;
  const user = req.user;

  let uploadedImages: string[] = [];

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  // console.log("files111", files);
  const images = files?.images;

  

  // Product
  const product = await ProductModule.Models.Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found in review create", 404);
  }

  // images Result for (multiple Image Upload)
  if (images?.length) {
    const imgsResult = await multipleImagesUploader({
      files: images,
      folder: `reviews/${product.title}`,
    });
    uploadedImages = imgsResult.map((img) => img.secure_url);
  }

  // create Review
  const review = await Review.create({
    product: productId,
    user: user?._id,
    rating: body.rating,
    title: body.title,
    description: body.description,
    name: body.name,
    images: uploadedImages,
    likes: [],
    dislikes: [],
  });

  if (!review) {
    if (uploadedImages?.length) {
      await multipleImagesRemover(uploadedImages);
    }
    throw new AppError("Fail To create review", 404);
  }

  product.reviews.push(review._id);
  await product.save({ validateBeforeSave: false });

  res.success(201, "Review Create SuccessFully");
};
