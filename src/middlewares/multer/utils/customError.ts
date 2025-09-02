import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_IMAGE_FILE_SIZE,
  MAX_VIDEO_FILE_SIZE,
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
  const videoSizeLimit = customLimits?.videoSize ?? MAX_VIDEO_FILE_SIZE;
  const otherSizeLimit = customLimits?.otherSize ?? 2 * MB;

  // Get custom allowed file types or default ones
  const allowedImageTypes = customFileTypes?.imageTypes ?? ALLOWED_IMAGE_TYPES;
  const allowedVideoTypes = customFileTypes?.videoTypes ?? ALLOWED_VIDEO_TYPES;
  const allowedOtherTypes = customFileTypes?.otherTypes ?? [];

  if (files && files.length > 0) {
    for (const file of files) {
      const { originalname, fieldname, size, mimetype } = file;

      const isImage = allowedImageTypes.includes(mimetype);
      const isVideo = allowedVideoTypes.includes(mimetype);
      const isOther = allowedOtherTypes.includes(mimetype);

      const fileSizeMB = (size / MB).toFixed(2);

      let allowedSizeMB = "0";
      if (isImage) {
        allowedSizeMB = (imageSizeLimit / MB).toFixed(2);
      } else if (isVideo) {
        allowedSizeMB = (videoSizeLimit / MB).toFixed(2);
      } else if (isOther) {
        allowedSizeMB = (otherSizeLimit / MB).toFixed(2);
      }

      // Check if the file size exceeds the limit
      if (isImage && size > imageSizeLimit) {
        messages.push(
          `Field: '${fieldname}' - File: '${originalname}' exceeds the image size limit. Max: ${allowedSizeMB}MB, got: ${fileSizeMB}MB.`
        );
      } else if (isVideo && size > videoSizeLimit) {
        messages.push(
          `Field: '${fieldname}' - File: '${originalname}' exceeds the video size limit. Max: ${allowedSizeMB}MB, got: ${fileSizeMB}MB.`
        );
      } else if (isOther && size > otherSizeLimit) {
        messages.push(
          `Field: '${fieldname}' - File: '${originalname}' exceeds the file size limit. Max: ${allowedSizeMB}MB, got: ${fileSizeMB}MB.`
        );
      } else if (!isImage && !isVideo && !isOther) {
        // Check if file type is allowed
        messages.push(
          `Invalid file type for Field: '${fieldname}' - '${originalname}'. Allowed types are: [${[
            ...allowedImageTypes,
            ...allowedVideoTypes,
            ...allowedOtherTypes,
          ]
            .map((type) => type.split("/")[1])
            .join(", ")}]`
        );
      }
    }
  }

  return messages.join(" & ");
};
