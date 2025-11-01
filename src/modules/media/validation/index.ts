import z from "zod";
import { validateZodString, validateZodUrl } from "../../../utils";

// single and multiple image upload zod Schema
export const uploadImageZodSchema = z.object({
  folderName: validateZodString({
    field: "folderName",
    blockSingleSpace: true,
  }),
});

// single image remove zod schema
export const removeSingleImageZodSchema = z.object({
  cloudUrl: validateZodUrl({ field: "cloudUrl" }),
});