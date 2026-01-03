import { Router } from "express";
import { AuthMiddleware, ResponseMiddleware } from "../../../middlewares";
import { getUserController } from "../controllers";
import { updateUserController } from "../controllers/updateUser";

export const router = Router();

router.get("/user", ResponseMiddleware.catchAsync(getUserController));
router.patch(
  "/user/update",
  AuthMiddleware.authenticated,
  ResponseMiddleware.catchAsync(updateUserController)
);
