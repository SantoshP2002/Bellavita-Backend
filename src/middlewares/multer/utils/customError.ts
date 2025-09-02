import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_FILE_SIZE,
  MB,
} from "../../../constants";
import { CustomFileErrorProps } from "../../../types";

export const getCustomError = ({
  files,
  customLimits,
  customFileTypes,
}: CustomFileErrorProps) => {
  const messages: string[] = [];

  // Default limits for image and video sizes
  const imageSizeLimit = customLimits?.imageSize ?? MAX_IMAGE_FILE_SIZE;

  // Get custom allowed file types or default ones
  const allowedImageTypes = customFileTypes?.imageTypes ?? ALLOWED_IMAGE_TYPES;

  if (files && files.length > 0) {
    for (const file of files) {
      const { originalname, fieldname, size, mimetype } = file;

      const isImage = allowedImageTypes.includes(mimetype);

      const fileSizeMB = (size / MB).toFixed(2);

      let allowedSizeMB = "0";
      if (isImage) {
        allowedSizeMB = (imageSizeLimit / MB).toFixed(2);
      }

      // Check if the file size exceeds the limit
      if (isImage && size > imageSizeLimit) {
        messages.push(
          `Field: '${fieldname}' - File: '${originalname}' exceeds the image size limit. Max: ${allowedSizeMB}MB, got: ${fileSizeMB}MB.`
        );
      } else if (!isImage) {
        // Check if file type is allowed
        messages.push(
          `Invalid file type for Field: '${fieldname}' - '${originalname}'. Allowed types are: [${allowedImageTypes
            .map((type) => type.split("/")[1])
            .join(", ")}]`
        );
      }
    }
  }

  return messages.join(" & ");
};
