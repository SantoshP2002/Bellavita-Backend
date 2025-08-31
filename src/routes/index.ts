import { Router } from "express";
import { AuthModule } from "../modules";

export const router = Router();


// Auth Routes
router.use("/auth", AuthModule.Routes.router);