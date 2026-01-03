import { Request, Response } from "express";
import { googleAuthClient } from "../../configs/o-auth";
import { User } from "../user/models";
import { generateToken } from "./services";
import {
  FRONTEND_DEVELOPMENT_URL,
  FRONTEND_PRODUCTION_URL,
  IS_DEV,
} from "../../env";

// GOOGLE REDIRECT
export const googleRedirect = async (_req: Request, res: Response) => {
  res.redirect(googleAuthClient.url); // User ko Google login page pe bhej deta hai
};

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string; // Google se user ka data nikalta hai
    if (!code) {
      console.error("Google callback missing code", req.query);
      return res.redirect(
        `${
          IS_DEV === "true" ? FRONTEND_DEVELOPMENT_URL : FRONTEND_PRODUCTION_URL
        }/google-auth}`
      );
    }

    const googleUser = await googleAuthClient.decode(code); // google api call OR User ka data milta hai

    const [firstName, ...rest] = googleUser.name.split(" ");
    const lastName = rest.join(" ") || "";

    let user = await User.findOne({ email: googleUser.email });

    if (!user) {
      user = await User.create({
        email: googleUser.email,
        firstName,
        lastName,
        profilePic: googleUser.profile,
        authProvider: "GOOGLE",
        googleId: googleUser.id,
      });
    }

    const token = generateToken(user._id);
    res.redirect(
      `${
        IS_DEV === "true" ? FRONTEND_DEVELOPMENT_URL : FRONTEND_PRODUCTION_URL
      }/google-auth?token=${token}}`
    );
  } catch (error) {
    console.error("Google callback error:", error);
    res.redirect(
      `${
        IS_DEV === "true" ? FRONTEND_DEVELOPMENT_URL : FRONTEND_PRODUCTION_URL
      }/google-auth}`
    );
  }
};
