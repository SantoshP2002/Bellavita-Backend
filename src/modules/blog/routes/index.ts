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
import { updateBlogController } from "../controller/updateBlog";
import { DeleteBlogByIdController } from "../controller/deleteBlogById";

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

// Update Blog
router.patch(
  "/:id",
  MulterMiddleware.validateFiles({
    type: "single",
    fieldName: "image",
  }),
  ResponseMiddleware.catchAsync(updateBlogController)
);

// Delete Blog
router.delete("/:id", ResponseMiddleware.catchAsync(DeleteBlogByIdController));
