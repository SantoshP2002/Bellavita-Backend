import { Router } from "express";
import {
  AddressModule,
  AuthModule,
  BlogModule,
  CartModule,
  CartProductModule,
  MediaModule,
  NewsroomModule,
  OrderModule,
  ProductModule,
  ReviewModule,
  UserModule,
} from "../modules";
import { ResponseMiddleware } from "../middlewares";
import { googleCallback, googleRedirect } from "../modules/auth/googleAuth";

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

// Order Route
router.use("/order", OrderModule.Routes.router);

// Review Route
router.use("/review", ReviewModule.Routes.router);

// media Route
router.use("/media", MediaModule.Routes.router);

// blog Route
router.use("/blog", BlogModule.Routes.router);

// Newsroom Route
router.use("/newsroom", NewsroomModule.Routes.router);

// GOOGLE ROUTE
router.get("/google", ResponseMiddleware.catchAsync(googleRedirect));
router.get("/google/callback", ResponseMiddleware.catchAsync(googleCallback));
