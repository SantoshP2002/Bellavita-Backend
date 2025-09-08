export type TUserRole = "ADMIN" | "USER";

export interface IUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePic: string;
  role: TUserRole;
  createdAt: Date;
  updatedAt: Date;
}


