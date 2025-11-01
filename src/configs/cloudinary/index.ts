import { v2 as cloudinary } from "cloudinary";

import { CloudinaryConfigOption } from "../../types";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../../env";

export const myCloudinary = (
  isImageOrVideoOrProduct: CloudinaryConfigOption
) => {
  if (isImageOrVideoOrProduct === "image") {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME as string,
      api_key: CLOUDINARY_API_KEY as string,
      api_secret: CLOUDINARY_API_SECRET as string,
      secure: true,
    });
  } else if (isImageOrVideoOrProduct === "product") {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME as string,
      api_key: CLOUDINARY_API_KEY as string,
      api_secret: CLOUDINARY_API_SECRET as string,
      secure: true,
    });
  }
  return cloudinary;
};

export const cloudinaryConnection = async (
  isImageOrVideoOrProduct: CloudinaryConfigOption
) => {
  try {
    const cloudinary = myCloudinary(isImageOrVideoOrProduct);

    const res = await cloudinary.api.ping();
    console.log(`Cloudinary Connected ✅`, res);
    return {
      success: true,
      error: false,
      message: `Cloudinary Connected ✅`,
    };
  } catch (err) {
    console.error(`Cloudinary Connection Error ❌`, err);
    return {
      success: false,
      error: true,
      message: `Cloudinary Connection Error ❌`,
    };
  }
};
