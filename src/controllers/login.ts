import { Request, Response } from "express";
import z, { email } from "zod";
import userModel from "../models/userSchema";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string("password must be a string")
    .min(6, "Password must be at least 6 characters long"),
});

// LOGIN CONTROLLER
const loginController = async (req: Request, res: Response) => {
  try {
    const result = loginSchema.safeParse(req.body);
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

    const { email, password } = result.data;
    // ExistingUser
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }
    // compare password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Password is Incorrect" });
    }

    // Token Generate Here (JWT)
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login Successfully", user, token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default loginController;