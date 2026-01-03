import { Request, Response } from "express";
import { singleImageRemover } from "../../../utils";

export const removeSingleImageController = async (
  req: Request,
  res: Response
) => {
  const { cloudUrl } = req.body;

  const { result } = await singleImageRemover(cloudUrl);

  res.success(200, "image Removed Successfully", {
    deletionStatus: {
      url: cloudUrl,
      status: result === "ok",
      message: result,
    },
  });
};
