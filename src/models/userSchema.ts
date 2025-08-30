import { model, Schema } from "mongoose";
import { maxLength, required } from "zod/mini";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "CUSTOMER";
}

// Mongoose User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: { type: String, default: "CUSTOMER" },
  },
  { timestamps: true, versionKey: false }
);

const userModel = model<IUser>("User", userSchema);

export default userModel;
