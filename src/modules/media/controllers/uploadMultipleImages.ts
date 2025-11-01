import { Request, Response } from "express";
import { multipleImagesUploader } from "../../../utils";

export const uploadMultipleImagesController = async (
  req: Request,
  res: Response
) => {
  const { folderName } = req.body;

  const files = req.files as Express.Multer.File[];

  const result = await multipleImagesUploader({
    files,
    folder: folderName,
  });
  const urls = result.map((file) => file.secure_url);

  res.success(200, "Image Upload Successfully", { urls });
};
