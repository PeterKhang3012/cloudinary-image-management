import { uploadAndOptimizeImage } from "../services/imageService.js";

export async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select an image to upload"
      });
    }

    const result = await uploadAndOptimizeImage(req.file);

    return res.status(201).json({
      message: "Image uploaded and optimized successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
}