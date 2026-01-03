import { Request, Response } from "express";
import { Blog } from "../models";
import { AppError } from "../../../classes";

export const DeleteBlogByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    throw new AppError("Blog Not Found in Delete blog Controller", 404);
  }

  res.success(202, "Delete Blog Successfully");
};
