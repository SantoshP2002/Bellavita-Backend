import { Router } from "express";
import { AuthModule, UserModule } from "../modules";

export const router = Router();


// Auth Routes
router.use("/auth", AuthModule.Routes.router);

// Users Routes
router.use("/users", UserModule.Routes.router);