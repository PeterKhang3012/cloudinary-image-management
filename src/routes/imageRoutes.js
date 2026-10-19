import { Router } from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadImage } from "../controllers/imageController.js";

const router = Router();

router.post("/upload", upload.single("image"), uploadImage);

export default router;