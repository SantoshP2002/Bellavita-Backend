import { UploadApiResponse } from "cloudinary";
import { Types } from "mongoose";

import { AppError } from "../classes";
import { cloudinaryConnection, myCloudinary } from "../configs/cloudinary";
import { CLOUDINARY_MAIN_FOLDER } from "../env";
import { MultipleFileUploaderProps, SingleFileUploaderProps } from "../types";

// ========== HELPER: Get Cloudinary Optimized URL ==========
export const getCloudinaryOptimizedUrl = (url: string): string => {
  if (!url) return "";

  // Check if URL already has f_auto,q_auto
  if (url.includes("f_auto") || url.includes("q_auto")) {
    return url; // Already optimized
  }

  // Insert f_auto,q_auto after /upload/
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
};

// ========== HELPER: Extract publicId from URL ==========
const extractPublicId = (imageUrl: string): string => {
  const regex = /\/v\d+\/(.+?)\.(jpg|jpeg|png|webp)$/;
  const match = imageUrl.match(regex);

  if (!match || !match[1]) {
    throw new AppError("Invalid Cloudinary image URL", 400);
  }

  return match[1];
};

// ========== COMMON REMOVER FUNCTION ==========
const removeFromCloudinary = async (
  publicId: string
): Promise<UploadApiResponse> => {
  const cloudinary = myCloudinary();

  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          console.log("Failed to remove image from Cloudinary", error);
          return reject(
            new AppError(
              error.message || "Failed to remove image from Cloudinary",
              500
            )
          );
        }
        resolve(result);
      }
    );
  });
};

// ========== SINGLE IMAGE REMOVER ==========
export const singleImageRemover = async (imageUrl: string) => {
  if (!imageUrl) {
    throw new AppError("Image URL is required", 400);
  }

  const cloudinaryConnectionTest = await cloudinaryConnection();

  if (cloudinaryConnectionTest.error) {
    throw new AppError(cloudinaryConnectionTest.message, 500);
  }

  try {
    const publicId = extractPublicId(imageUrl);
    const result = await removeFromCloudinary(publicId);
    return result;
  } catch (error) {
    throw new AppError(
      error instanceof Error ? error.message : "Unexpected error during remove",
      500
    );
  }
};

// ========== MULTIPLE IMAGES REMOVER ==========
export const multipleImagesRemover = async (imageUrls: string[]) => {
  if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
    throw new AppError("Image URLs are required", 400);
  }

  const cloudinaryConnectionTest = await cloudinaryConnection();
  if (cloudinaryConnectionTest.error) {
    throw new AppError(cloudinaryConnectionTest.message, 500);
  }

  try {
    const removePromises = imageUrls.map(async (url) => {
      const publicId = extractPublicId(url);
      return removeFromCloudinary(publicId);
    });

    const removeResults = await Promise.all(removePromises);

    return removeResults; // Array of UploadApiResponse
  } catch (error) {
    throw new AppError(
      error instanceof Error
        ? error.message
        : "Unexpected error during multiple remove",
      500
    );
  }
};

const mainFolder = CLOUDINARY_MAIN_FOLDER;

// ========== COMMON IMAGE UPLOADER FUNCTION ==========
const uploadToCloudinary = async (
  file: Express.Multer.File,
  folder: string
): Promise<UploadApiResponse> => {
  const subFolder = folder?.split(" ").join("_") || "Common_Folder";

  const publicId = `${new Date()
    .toLocaleDateString()
    .replace(/\//g, "-")}_${Date.now()}_${file?.originalname
    .split(" ")
    .join("_")
    .split(".")
    .slice(0, -1)
    .join("")}`;

  const cloudinary = myCloudinary();

  return new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `${mainFolder}/${subFolder}`,
          public_id: publicId,
          resource_type: "image",
          allowed_formats: ["jpg", "jpeg", "png", "webp"],
          format: "webp", // convert to webp
          transformation: [{ fetch_format: "webp", quality: "auto" }],
        },
        (error, result) => {
          if (error) {
            return reject(
              new AppError(
                error.message || "Failed to upload image on Cloudinary",
                500
              )
            );
          } else if (result) {
            const optimizedUrl = getCloudinaryOptimizedUrl(result.secure_url);
            const finalResult = { ...result, secure_url: optimizedUrl };
            resolve(finalResult);
          } else {
            reject(new AppError("Failed to upload image on Cloudinary", 500));
          }
        }
      )
      .end(file?.buffer);
  });
};

// ========== SINGLE IMAGE UPLOADER ==========
export const singleImageUploader = async ({
  file,
  folder = "",
}: SingleFileUploaderProps) => {
  try {
    const cloudinaryConnectionTest = await cloudinaryConnection();

    if (cloudinaryConnectionTest.error) {
      throw new AppError(cloudinaryConnectionTest.message, 500);
    }

    const result = await uploadToCloudinary(file, folder);
    return result;
  } catch (error) {
    throw new AppError(
      error instanceof Error ? error.message : "Unexpected error during upload",
      500
    );
  }
};

// ========== MULTIPLE IMAGES UPLOADER ==========
export const multipleImagesUploader = async ({
  files,
  folder = "",
}: MultipleFileUploaderProps) => {
  try {
    const cloudinaryConnectionTest = await cloudinaryConnection();

    if (cloudinaryConnectionTest.error) {
      throw new AppError(cloudinaryConnectionTest.message, 500);
    }

    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file, folder)
    );

    const uploadResults = await Promise.all(uploadPromises);

    return uploadResults; // Array of UploadApiResponse
  } catch (error) {
    throw new AppError(
      error instanceof Error
        ? error.message
        : "Unexpected error during multiple uploads",
      500
    );
  }
};

export const isValidMongoId = (
  id: string,
  message: string,
  statusCode?: number
): boolean => {
  const isValid = Types.ObjectId.isValid(id);

  if (!isValid) throw new AppError(message, statusCode || 400);

  return true;
};
