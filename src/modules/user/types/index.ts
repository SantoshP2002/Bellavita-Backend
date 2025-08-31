export interface IUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: "ADMIN" | "USER";
    createdAt: Date;
    updatedAt: Date;
}