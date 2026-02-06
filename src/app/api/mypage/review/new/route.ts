import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// 업로드 폴더
const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const orderItemId = Number(formData.get("orderItemId"));
    const rating = Number(formData.get("rating"));
    const content = formData.get("content");
    const loginUserId = Number(formData.get("userId")); // 프론트에서 보내는 userId

    if (!orderItemId || !loginUserId) {
      return NextResponse.json(
        { error: "주문 상품 ID 또는 유저 ID 누락" },
        { status: 400 },
      );
    }

    // 이미지 업로드
    const images: string[] = [];
    const files = formData.getAll("images") as File[];
    for (const file of files) {
      if (!(file instanceof File)) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + "-" + file.name;
      await fs.promises.writeFile(path.join(uploadDir, filename), buffer);
      images.push("/uploads/" + filename); // 클라이언트에서 접근 가능하도록 경로 포함
    }

    // Prisma DB 저장
    const createdReview = await prisma.review.create({
      data: {
        orderItemId,
        userId: loginUserId,
        rating,
        content,
        images,
      },
    });

    // ✅ 생성된 리뷰 ID 반환
    return NextResponse.json({
      message: "리뷰 등록 성공",
      reviewId: createdReview.id,
    });
  } catch (err) {
    console.error(err);
    // ❌ catch에서는 createdReview.id 쓰면 안 됨
    return NextResponse.json({ error: "리뷰 등록 실패" }, { status: 500 });
  }
}
