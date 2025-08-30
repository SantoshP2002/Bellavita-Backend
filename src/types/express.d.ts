import type { Multer } from "multer";

declare global {
  namespace Express {
    export interface Request {
      file?: Express.Multer.File; // single file
      files?:
        | Express.Multer.File[]
        | { [fieldname: string]: Express.Multer.File[] }; // multiple files
    }
  }
}
