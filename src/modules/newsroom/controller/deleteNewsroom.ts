import { Request, Response } from "express";
import { NewsroomModel } from "../models";
import { AppError } from "../../../classes";

export const deleteNewsroomController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const newsroom = await NewsroomModel.findByIdAndDelete(id);
  if (!newsroom) {
    throw new AppError("Newsroom Not Found in Delete Newsroom Controller", 404);
  }

  res.success(202, "Delete Newsroom Successfully");
};
