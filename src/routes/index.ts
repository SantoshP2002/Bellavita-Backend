import { Router } from "express";
import { AddressModule, AuthModule, CartModule, CartProductModule, ProductModule, UserModule } from "../modules";

export const router = Router();

// Auth Routes
router.use("/auth", AuthModule.Routes.router);

// Users Routes
router.use("/users", UserModule.Routes.router);

// Products Routes
router.use("/products", ProductModule.Routes.router);

// Cart Product Routes
router.use("/cart-product", CartProductModule.Routes.router);

// Cart Routes
router.use("/cart", CartModule.Routes.router);

// Address Routes
router.use("/address", AddressModule.Routes.router);
