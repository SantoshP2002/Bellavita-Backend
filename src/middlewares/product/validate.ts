import { ZodObject, ZodRawShape } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject<ZodRawShape>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (err: any) {
       res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: err.errors,
      });
    }
  };
