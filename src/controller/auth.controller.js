import bcrypt from "bcrypt";
import UserModel from "../model/user.model.js";

// Register controller
const registerController = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  const { name, email, password } = req.body;

  try {
    // Check if user already exists

    const userDetails = await UserModel.findOne({ email });
    if (userDetails) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (!email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Internal server error" });
  }
};

// Login controller

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userDetails = await UserModel.findOne({ email });
    if (!userDetails) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // Compare Password
    const matchPassword = await bcrypt.compare(password, userDetails.password);
    if (!matchPassword) {
      return res.status(400).json({ message: "Password Incorrect" });
    }

    res.send({
      message: "Login successful",
      user: {
        id: userDetails._id,
        name: userDetails.name,
        email: userDetails.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { registerController, loginController };
