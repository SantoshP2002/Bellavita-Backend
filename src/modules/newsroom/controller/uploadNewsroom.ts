import { Request, Response } from "express";
import { singleImageUploader } from "../../../utils";
import { NewsroomModel } from "../models";
import { AppError } from "../../../classes";

export const uploadNewsroomController = async (req: Request, res: Response) => {
  const file = req.file;

  let imgUrl = "";

  if (file) {
    const cldResp = await singleImageUploader({
      file,
      folder: "newsroom_Image",
    });

    imgUrl = cldResp.secure_url;
  }

  const newsroom = await NewsroomModel.create({
    ...req.body,
    image: imgUrl,
  });

  if (!newsroom) {
    throw new AppError("Fail to Create Newsroom", 404);
  }

  await newsroom.save();
  res.success(200, "Newsroom Created Successfully", newsroom);
};
