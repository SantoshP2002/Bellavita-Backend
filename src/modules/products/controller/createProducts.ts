import { Request, Response } from "express";
import { Product } from "../models";
import { AppError } from "../../../classes";
import { multipleImagesUploader } from "../../../utils";

export const createProductsController = async (req: Request, res: Response) => {
  const files = req.files as {
    [fieldname: string]: Express.Multer.File[];
  };

  let imgUrls: string[] = [];
  const images = files?.images ?? [];

  if (images.length > 0) {
    const cldResp = await multipleImagesUploader({
      files: images,
      folder: "Product_Images",
    });

    imgUrls = cldResp.map((res) => res.secure_url) ?? [];
  }

  const product = await Product.create({
    ...req?.body,
    images: imgUrls,
  });

  if (!product) {
    throw new AppError("Failed to create product", 400);
  }
  await product.save();
  res.success(200, "Product created Successfully", { product });
};
