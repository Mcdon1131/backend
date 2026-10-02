import cloudinary from "../config/cloudinary.js";

export async function generateImageUrl(imgFile) {
  if (!imgFile) {
    throw new Error("No Image Uploaded");
  }
  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "hostels" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
    stream.end(imgFile.buffer);
  });
  return uploadResult;
}
