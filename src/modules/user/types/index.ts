import { Types } from "mongoose";

export type TUserRole = "ADMIN" | "USER";

export interface IUser {
  _id: string | Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePic: string;
  role: TUserRole;
  createdAt: Date;
  updatedAt: Date;
}


