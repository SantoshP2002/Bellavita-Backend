import { Request, Response } from "express";
import z from "zod";
import userModel from "../models/userSchema";
import bcrypt from "bcrypt";

const registerSchema = z.object({
  name: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// REGISTER CONTROLLER
const registerController = async (req: Request, res: Response) => {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error?.issues;
      console.log(errors);

      const errorMessage = errors
        ?.map(
          (err, ind) =>
            `${errors.length > 1 ? `${ind + 1}. ` : ""}${err.message}`
        )
        .join(", ");
      return res.status(400).json({ message: errorMessage });
    }

    const { name, email, password } = result.data;

    // ExistingUser
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new User
    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
      role: "CUSTOMER",
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default registerController;
