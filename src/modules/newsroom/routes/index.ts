import { Router } from "express";
import {
  AuthMiddleware,
  MulterMiddleware,
  ResponseMiddleware,
} from "../../../middlewares";
import { uploadNewsroomController } from "../controller/uploadNewsroom";
import { getNewsroomBydController, getNewsroomController } from "../controller";
import { updateNewsroomController } from "../controller/updateNewsroom";
import { deleteNewsroomController } from "../controller/deleteNewsroom";

export const router = Router();

// Upload Newsroom
router.post(
  "/create",
  AuthMiddleware.authorized(["ADMIN"]),
  MulterMiddleware.validateFiles({
    type: "single",
    fieldName: "image",
  }),
  ResponseMiddleware.catchAsync(uploadNewsroomController),
);

// Get All Newsroom
router.get("/", ResponseMiddleware.catchAsync(getNewsroomController));

// Get Newsroom by ID
router.get("/:id", ResponseMiddleware.catchAsync(getNewsroomBydController));

// Update Newsroom
router.patch(
  "/:id",
  MulterMiddleware.validateFiles({
    type: "single",
    fieldName: "image",
  }),
  ResponseMiddleware.catchAsync(updateNewsroomController),
);

// Delete Newsroom
router.delete("/:id", ResponseMiddleware.catchAsync(deleteNewsroomController));
