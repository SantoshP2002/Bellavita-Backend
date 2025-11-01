import { Request, Response } from "express";
import { singleImageUploader } from "../../../utils";

export const uploadSingleImageController = async (
  req: Request,
  res: Response
) => {
  const { folderName } = req.body;

  const file = req.file as Express.Multer.File;

  const result = await singleImageUploader({
    file,
    folder: folderName,
  });

  res.success(200, "Image Upload Successfully", { result });
};
