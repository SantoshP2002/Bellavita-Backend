import { FRONTEND_DEVELOPMENT_URL, FRONTEND_PRODUCTION_URL } from "../env";

export const allowedOrigins = [
  FRONTEND_DEVELOPMENT_URL,
  FRONTEND_PRODUCTION_URL,
];

export const MB = 1024 ** 2;
export const MAX_IMAGE_FILE_SIZE = 2 * MB; // 2MB
export const MAX_VIDEO_FILE_SIZE = 50 * MB; // 50MB

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];
