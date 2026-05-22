import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "파일 없음" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "Dobok1/resources/tmp",
          resource_type: "auto",
        },
        (err, result) => {
          if (err || !result) return reject(err);
          resolve(result);
        },
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      fileName: file.name,
      fileUrl: result.secure_url,
      publicId: result.public_id,
      fileType: file.type,
      fileSize: file.size,
    });
  } catch (e) {
    return NextResponse.json({ message: "업로드 실패" }, { status: 500 });
  }
}
