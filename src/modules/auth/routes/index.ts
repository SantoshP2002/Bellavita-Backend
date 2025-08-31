import { Router } from "express";
import { registerController } from "../controllers/register";

export const router = Router();

router.post("/register", registerController);
