import { Request, Response } from "express";
import { multipleImagesRemover } from "../../../utils";

export const removeMultipleImageController = async (
  req: Request,
  res: Response
) => {
  const { cloudUrls } = req.body;

  const result = await multipleImagesRemover(cloudUrls);

  res.success(200, "Image Removed Successfully", { result });
};
