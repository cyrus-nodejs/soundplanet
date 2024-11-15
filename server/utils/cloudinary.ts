
import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary';



cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});


export const uploadToCloudinary = async (path: string, folder = "soundassets") => {
    try {
      const data = await cloudinary.uploader.upload(path, { folder: folder, resource_type:"auto" });
      return { url: data.secure_url, publicId: data.public_id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };