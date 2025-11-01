import z from "zod";
import { validateZodString } from "../../../utils";

export const uploadImageZodSchema = z.object({
  folderName: validateZodString({
    field: "folderName",
    blockSingleSpace: true,
  }),
});
