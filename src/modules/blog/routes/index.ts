import { Router } from "express";
import {
  // AuthMiddleware,
  MulterMiddleware,
  ResponseMiddleware,
} from "../../../middlewares";
import { uploadBlogController } from "../controller/uploadBlog";

export const router = Router();

router.post(
  "/create",
  // AuthMiddleware.authorized(["ADMIN"]),
  MulterMiddleware.validateFiles({
    type: "single",
    fieldName: "image"
  }),
  ResponseMiddleware.catchAsync(uploadBlogController)
);
