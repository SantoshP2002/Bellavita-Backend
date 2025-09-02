import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../../env";

export const myCloudinary = () => {
  cloudinary.config({
    cloud_name: String(CLOUDINARY_CLOUD_NAME),
    api_key: String(CLOUDINARY_API_KEY),
    api_secret: String(CLOUDINARY_API_SECRET),
    secure: true,
  });
  return cloudinary;
};

export const cloudinaryConnection = async () => {
  try {
    const cloudinary = myCloudinary();

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
