import { Request, Response } from "express";
import { singleImageUploader } from "../../../utils";
import { NewsroomModel } from "../models";
import { AppError } from "../../../classes";

export const updateNewsroomController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;

  if (req.file) {
    const cldResp = await singleImageUploader({
      file: req.file,
      folder: "Newsroom_Image",
    });

    update.image = cldResp.secure_url;

    const newsroom = await NewsroomModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!newsroom) {
      throw new AppError("Newsroom not found in Update newsroom", 404);
    }

    res.success(200, "Newsroom Update Successfully", { newsroom });
  }
};
