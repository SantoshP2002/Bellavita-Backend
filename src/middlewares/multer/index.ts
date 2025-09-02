import multer, { MulterError } from "multer";
import { NextFunction, Request, Response } from "express";

import { FileValidatorOptionsProps, MulterType } from "../../types";
import { AppError } from "../../classes";
import { getCustomError, getMulterError } from "./utils";

export const validateFiles = ({
  type,
  fieldName,
  maxCount,
  fieldsConfig,
  limits,
  customLimits,
  customFileTypes,
}: FileValidatorOptionsProps) => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage, limits });

  let uploadMiddleware: any;

  switch (type) {
    case "single":
      if (!fieldName)
        throw new Error("Field name is required for single upload.");
      uploadMiddleware = upload.single(fieldName);
      break;
    case "array":
      if (!fieldName)
        throw new Error("Field name is required for array upload.");
      uploadMiddleware = upload.array(fieldName, maxCount);
      break;
    case "fields":
      if (!fieldsConfig)
        throw new Error("fieldsConfig is required for fields upload.");
      uploadMiddleware = upload.fields(fieldsConfig);
      break;
    case "any":
      uploadMiddleware = upload.any();
      break;
    case "none":
      uploadMiddleware = upload.none();
      break;
    default:
      throw new Error("Invalid upload type");
  }

  return (req: Request, res: Response, next: NextFunction) => {
    uploadMiddleware(req, res, (err: MulterError | Error | any) => {
      const multerErrMsg = getMulterError({
        err,
        ...(fieldName && { fieldName }),
        ...(maxCount && { maxCount }),
      });

      if (multerErrMsg) {
        return next(new AppError(multerErrMsg, 400));
      }

      const checkableTypes: MulterType[] = ["single", "array", "any", "fields"];
      const shouldCheckFiles = checkableTypes.includes(type);

      if (shouldCheckFiles) {
        let allFiles: Express.Multer.File[] = [];

        switch (type) {
          case "fields": {
            const fieldMap = req.files as {
              [field: string]: Express.Multer.File[];
            };
            allFiles = Object.values(fieldMap || {}).flat();
            break;
          }

          case "array":
          case "any": {
            allFiles = (req.files as Express.Multer.File[]) || [];
            break;
          }

          case "single": {
            if (req.file) {
              allFiles = [req.file];
            }
            break;
          }

          default:
            allFiles = [];
        }

        const customErrMsg = getCustomError({
          files: allFiles,
          ...(customLimits && { customLimits }),
          ...(customFileTypes && { customFileTypes }),
        });

        if (customErrMsg) {
          return next(new AppError(customErrMsg, 400));
        }
      }

      next();
    });
  };
};
