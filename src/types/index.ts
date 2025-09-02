import { Request } from "express";

// Interface for authenticated requests with user
export interface AuthenticatedRequest extends Request {
  user?: Omit<UserModule.ITypes.IUser, "password">; // User object without password
}

// Interface for authorized requests with user
export interface AuthorizedRequest extends Request {
  user?: Omit<UserModule.ITypes.IUser, "password">; // User object without password
}

import multer from "multer";
import { UserModule } from "../modules";

export type MulterType = "single" | "array" | "any" | "fields" | "none";

export type CustomLimitsType = {
  imageSize?: number;
  videoSize?: number;
  otherSize?: number;
};

export type CustomFileType = {
  imageTypes?: string[];
  videoTypes?: string[];
  otherTypes?: string[];
};

export type FieldsConfigType = {
  name: string;
  maxCount: number;
};

export interface FileValidatorOptionsProps {
  type: MulterType;
  fieldName?: string;
  maxCount?: number;
  fieldsConfig?: FieldsConfigType[];
  limits?: multer.Options["limits"];
  customLimits?: CustomLimitsType;
  customFileTypes?: CustomFileType;
}

export interface CustomFileErrorProps {
  files: Express.Multer.File[];
  customLimits?: CustomLimitsType;
  customFileTypes?: CustomFileType;
}

export interface ValidateRequiredFileFieldsParams {
  req: Request;
  fields: string[];
}

export interface CheckUserPermission {
  userId: string | UserModule.ITypes.IUser;
  checkId: string | UserModule.ITypes.IUser;
  message: string;
  statusCode?: number;
}

export interface ZodCommonConfigs {
  field: string;
  parentField?: string;
  isOptional?: boolean;
}

interface ZodCompareConfigs {
  min?: number | undefined;
  max?: number | undefined;
}

export interface ZodStringConfigs extends ZodCommonConfigs, ZodCompareConfigs {
  blockMultipleSpaces?: boolean;
  blockSingleSpace?: boolean;
  nonEmpty?: boolean;
  customRegex?: {
    regex: RegExp;
    message: string | number;
  };
}

export interface ZodNumberConfigs extends ZodCommonConfigs, ZodCompareConfigs {
  mustBeInt?: boolean;
  nonNegative?: boolean;
}

export interface ZodDateConfigs extends ZodCommonConfigs {
  mustBePastDate?: boolean;
  mustBeFutureDate?: boolean;
}

export interface ValidateZodFieldConfigs
  extends ZodStringConfigs,
    ZodNumberConfigs,
    ZodDateConfigs {}
