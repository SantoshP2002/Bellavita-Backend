import { Request, Response } from "express";
import { singleImageUploader } from "../../../utils";
import { Blog } from "../models";
import { AppError } from "../../../classes";

export const uploadBlogController = async (req: Request, res: Response) => {
  const file = req.file;

  let imgUrl = "";

  if (file) {
    const cldResp = await singleImageUploader({
      file,
      folder: "Blog_Image",
    });

    imgUrl = cldResp.secure_url;
  }

  const blog = await Blog.create({
    ...req.body,
    image: imgUrl,
  });

  if (!blog) {
    throw new AppError("Fail to create Blog", 404);
  }

  await blog.save();
  res.success(200, "Blog Create Successfully", { blog });
};
