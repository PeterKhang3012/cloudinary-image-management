import { randomUUID } from "node:crypto";
import {cloudinary} from "../config/cloudinary.js";

export async function uploadAndOptimizeImage(file) {
  // Upload buffer lên Cloudinary
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: `seminar-${randomUUID()}`,
        resource_type: "image"
      },
      (error, uploadResult) => {
        if (error) {
          return reject(error);
        }

        resolve(uploadResult);
      }
    );

    stream.end(file.buffer);
  });

  // Tạo URL ảnh tối ưu
  const optimizedUrl = cloudinary.url(result.public_id, {
    width: 400,
    height: 400,
    crop: "fill",
    gravity: "auto",
    fetch_format: "auto",
    quality: "auto",
    secure: true
  });

  return {
    publicId: result.public_id,

    original: {
      url: result.secure_url,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes
    },

    optimized: {
      url: optimizedUrl,
      width: 400,
      height: 400
    }
  };
}