import { Request, Response } from "express";
import { getUserByToken } from "../services";

export const getUserController = async (req: Request, res: Response) => {
  const user = await getUserByToken(req);
  res.success(200, "User found successfully", { user });
};
