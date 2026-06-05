import cloudinary from "./cloudinary";

export async function uploadImage(file: File, folder: string) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
        },
        (error, result) => {
          if (error || !result) {
            reject(error);
            return;
          }

          resolve(result.secure_url);
        },
      )
      .end(buffer);
  });
}
