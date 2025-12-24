import { Router } from "express";
import {
  AuthMiddleware,
  MulterMiddleware,
  ResponseMiddleware,
} from "../../../middlewares";
import { uploadBlogController } from "../controller/uploadBlog";
import {
  getBlogByIdController,
  getBlogController,
} from "../controller/getBlogController";

export const router = Router();

// Create Blog
router.post(
  "/create",
  AuthMiddleware.authorized(["ADMIN"]),
  MulterMiddleware.validateFiles({
    type: "single",
    fieldName: "image",
  }),
  ResponseMiddleware.catchAsync(uploadBlogController)
);

// Get Blog
router.get("/", ResponseMiddleware.catchAsync(getBlogController));

// Get Blog by ID
router.get("/:id", ResponseMiddleware.catchAsync(getBlogByIdController));
