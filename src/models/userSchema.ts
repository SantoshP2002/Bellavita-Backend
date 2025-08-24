import { model, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

// Mongoose User Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
});

const userModel = model<IUser>("User", userSchema);

export default userModel;
