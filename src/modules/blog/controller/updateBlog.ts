import { Request, Response } from "express";
import { Blog } from "../models";
import { AppError } from "../../../classes";
import { singleImageUploader } from "../../../utils";

export const updateBlogController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;

  if (req.file) {
    const cldResp = await singleImageUploader({
      file: req.file,
      folder: "Blog_Image",
    });

    update.image = cldResp.secure_url;

    const blog = await Blog.findByIdAndUpdate(id, update, { new: true });

    if (!blog) {
      throw new AppError("Product not found in Update blog", 404);
    }

    res.success(200, "Blog Update Successfully", { blog });
  }
};
