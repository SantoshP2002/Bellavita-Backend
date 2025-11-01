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

// multiple  image remove zod schema
export const removeMultipleImagesZodSchema = z.object({
  cloudUrls: z
    .array(validateZodUrl({ field: "cloudUrls" }))
    .nonempty({ message: `The 'cloudUrls' field cannot be empty.` })
});
