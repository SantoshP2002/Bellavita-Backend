import { Request, Response } from "express";

export const registerController = async (_req: Request, res: Response) => {
  res.success(200, "Register");
};
