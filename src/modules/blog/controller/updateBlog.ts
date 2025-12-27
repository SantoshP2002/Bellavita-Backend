import { Request, Response } from "express";
import { Blog } from "../models";
import { AppError } from "../../../classes";
import { removeFromCloudinary, singleImageUploader } from "../../../utils";

export const updateBlogController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;

  const oldBlog = await Blog.findById(id);
  if (!oldBlog) {
    throw new AppError("Old Blog not found", 404);
  }

  if (req.file) {
    // delete old image
    if (oldBlog.imagePublicId) {
      await removeFromCloudinary(oldBlog.imagePublicId);
    }

    const cldResp = await singleImageUploader({
      file: req.file,
      folder: "Blog_Image",
    });

    update.image = cldResp.secure_url;
    update.imagePublicId = cldResp.public_id;

    const blog = await Blog.findByIdAndUpdate(id, update, { new: true });

    if (!blog) {
      throw new AppError("Product not found in Update blog", 404);
    }

    res.success(200, "Blog Update Successfully", { blog });
  }
};
