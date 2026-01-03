import { Request, Response, NextFunction } from "express";

type ParseFieldsMiddlewareProps = {
  fieldsToParse: string[];
};

export const JSONParse = ({
  fieldsToParse = [],
}: ParseFieldsMiddlewareProps) => {
  return (req: Request, _: Response, next: NextFunction) => {
    fieldsToParse.forEach((key) => {
      const value = req.body?.[key];

      // Skip parsing if value is undefined or null
      if (value === undefined || value === null) return;

      if (typeof value === "string") {
        try {
          const parsed = JSON.parse(value);

          // Replace only if parsed is an object or array
          if (parsed && typeof parsed === "object") {
            req.body[key] = parsed;
          }
          // Else, keep the original string value
        } catch {
          // If JSON.parse fails, keep original value as it is
        }
      }
    });

    next();
  };
};
