import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadImageToCloudinary = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.single("image")(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: "Multer error", error: err.message });
    } else if (err) {
      return res
        .status(500)
        .json({ message: "Unknown error", error: err.message });
    } else if (!req.file) {
      // If no image file is provided, set imageURL to null and proceed
      (req as any).imageURL = null;
      return next();
    }

    // Upload image to Cloudinary
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Image upload failed.", error: error.message });
        }

        if (result) {
          // Store the Cloudinary URL in the request object
          (req as any).imageURL = result.secure_url;
        }

        // Continue to the next middleware
        next();
      })
      .end(req.file.buffer);
  });
};

export default uploadImageToCloudinary;
