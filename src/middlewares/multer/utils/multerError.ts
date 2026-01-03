import { MulterError } from "multer";

export const getMulterError = ({
  err,
  fieldName = "",
  maxCount,
}: {
  err: MulterError | Error | any;
  fieldName?: string;
  maxCount?: number;
}) => {
  let message = "";

  if (err instanceof MulterError) {
    switch (err.code) {
      case "LIMIT_UNEXPECTED_FILE": {
        const baseMessage = err.field
          ? `Unexpected file field '${err.field}'.`
          : `Unexpected file field`;

        if (fieldName && maxCount) {
          message = `${baseMessage} Expected field is '${fieldName}' and only up to ${maxCount} files can be uploaded.`;
        } else if (fieldName) {
          message = `${baseMessage} Expected field is '${fieldName}' and only one file can be uploaded.`;
        } else if (maxCount) {
          message = `${baseMessage} Only up to ${maxCount} files can be uploaded.`;
        } else {
          message = `${baseMessage} ${err.name ? `'${err.name}'` : ""} ${
            err.code ? `'${err.code}'` : ""
          } ${err.message ? `'${err.message}'` : ""}${
            err.cause ? ` - '${err.cause}'` : ""
          }.`;
        }
        break;
      }

      case "LIMIT_FILE_COUNT": {
        const baseMessage = `Too many files uploaded for "${err.field}".`;

        if (maxCount) {
          message = `${baseMessage} Maximum allowed: ${maxCount} file${
            maxCount > 1 ? "s" : ""
          }.`;
        } else {
          message = `${baseMessage} ${err.name ? `'${err.name}'` : ""} ${
            err.code ? `'${err.code}'` : ""
          } ${err.message ? `'${err.message}'` : ""}${
            err.cause ? ` - '${err.cause}'` : ""
          }.`;
        }
        break;
      }

      case "LIMIT_FIELD_COUNT": {
        const baseMessage = `${err.code}${
          err.field ? ` on field '${err.field}'` : ""
        }`;

        message = `${baseMessage} - ${err.message ? `'${err.message}'` : ""}${
          err.cause ? ` - '${err.cause}'` : ""
        }.`;
        break;
      }

      case "LIMIT_FIELD_KEY": {
        const baseMessage = `${err.code}${
          err.field ? ` on field '${err.field}'` : ""
        }`;

        message = `${baseMessage} - ${err.message ? `'${err.message}'` : ""}${
          err.cause ? ` - '${err.cause}'` : ""
        }.`;
        break;
      }

      case "LIMIT_FIELD_VALUE": {
        const baseMessage = `${err.code}${
          err.field ? ` on field '${err.field}'` : ""
        }`;

        message = `${baseMessage} - ${err.message ? `'${err.message}'` : ""}${
          err.cause ? ` - '${err.cause}'` : ""
        }.`;
        break;
      }

      case "LIMIT_FILE_SIZE": {
        const baseMessage = err.field
          ? `File size for '${err.field}' exceeds the limit.`
          : `File size exceeds the limit.`;

        message = `${baseMessage} ${err.message ? `'${err.message}'` : ""}${
          err.cause ? ` - '${err.cause}'` : ""
        }.`;
        break;
      }

      case "LIMIT_PART_COUNT": {
        const baseMessage = `${err.code}${
          err.field ? ` on field '${err.field}'` : ""
        }`;

        message = `${baseMessage} - ${err.message ? `'${err.message}'` : ""}${
          err.cause ? ` - '${err.cause}'` : ""
        }.`;
        break;
      }

      default:
        message = `Multer error (${err.code}) on field "${err.field}".`;
    }
  } else if (err) {
    message = `Unknown error while uploading files: ${err.message}`;
  }

  return message;
};
