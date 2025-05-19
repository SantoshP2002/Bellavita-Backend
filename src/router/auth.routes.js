import { Router } from "express";
import { loginController, registerController } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

export default authRouter;