import { Request, Response } from "express";
import { Blog } from "../models";
import { AppError } from "../../../classes";

export const getBlogController = async (_req: Request, res: Response) => {
  const blog = await Blog.find().sort({ createdAt: -1 });

  if (!blog) {
    throw new AppError("Get Blog not found", 404);
  }

  res.success(201, "Blog get Successfully", { blog });
};

// get blog by id
export const getBlogByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const blog = await Blog.findById( id );

  if (!blog) {
    throw new AppError("Get Blog not found By Id", 404);
  }

  res.success(202, "Blog get by ID successfully", { blog });
};
