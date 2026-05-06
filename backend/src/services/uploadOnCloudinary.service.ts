import cloudinary from "../config/cloudinary.js";  // ✅ your configured instance
import type { UploadApiResponse } from "cloudinary";

export const uploadOnCloudinary = async (
  fileBuffer: Buffer
): Promise<UploadApiResponse | null> => {
  try {
    if (!fileBuffer) return null;

    return new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "products",
          resource_type: "image",
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result as UploadApiResponse);
        }
      );

      stream.end(fileBuffer);
    });

  } catch (error) {
    return null;
  }
};