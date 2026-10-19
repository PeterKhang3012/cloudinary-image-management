import "dotenv/config";
import express from "express";
import multer from "multer";
import imageRoutes from "./routes/imageRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/images", imageRoutes);

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      message: "File upload error",
      error: err.message
    });
  }

  if (
    err.message === "Only JPG, PNG and WebP are allowed"
  ) {
    return res.status(400).json({
      message: err.message
    });
  }

  return res.status(500).json({
    message: "An internal server error occurred"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});