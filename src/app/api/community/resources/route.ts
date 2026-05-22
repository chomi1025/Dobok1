import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);

    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      prisma.resourcePost.findMany({
        orderBy: {
          createdAt: "desc",
        },

        skip,
        take: limit,

        include: {
          author: true,

          attachments: true,
        },
      }),

      prisma.resourcePost.count(),
    ]);

    return NextResponse.json({
      posts,
      total,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "데이터 조회 실패",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          message: "로그인이 필요합니다.",
        },
        {
          status: 401,
        },
      );
    }

    const formData = await req.formData();

    const title = formData.get("title")?.toString() || "";
    const content = formData.get("content")?.toString() || "";

    const category = formData.get("category")?.toString() || "DOCUMENT";

    const videoUrl = formData.get("videoUrl")?.toString() || "";

    const externalUrl = formData.get("externalUrl")?.toString() || "";

    const attachmentsRaw = formData.get("attachments")?.toString() || "[]";
    const attachments = JSON.parse(attachmentsRaw);

    const post = await prisma.resourcePost.create({
      data: {
        title,
        content,
        category,
        videoUrl,
        externalUrl,

        authorId: Number(session.user.id),

        attachments: {
          create: attachments.map((file: any) => ({
            fileName: file.fileName,
            fileUrl: file.fileUrl,
            publicId: file.publicId,
            fileType: file.fileType,
            fileSize: file.fileSize,
          })),
        },
      },

      include: {
        attachments: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "게시글 등록 실패",
      },
      {
        status: 500,
      },
    );
  }
}
