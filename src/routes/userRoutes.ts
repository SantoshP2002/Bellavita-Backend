import express from "express";
import registerController from "../controllers/register";
import loginController from "../controllers/login";

const router = express.Router();

router.post("/register", registerController)
router.post("/login", loginController);

export default router;