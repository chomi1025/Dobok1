import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const orderItemId = Number(formData.get("orderItemId"));
    const rating = Number(formData.get("rating"));
    let content = formData.get("content");
    const loginUserId = Number(formData.get("userId"));

    if (content === null) {
      content = "";
    } else {
      content = content.toString();
    }

    if (!orderItemId || !loginUserId) {
      return NextResponse.json(
        { error: "주문 상품 ID 또는 유저 ID 누락" },
        { status: 400 },
      );
    }

    const images: string[] = [];
    const files = formData.getAll("images") as File[];
    for (const file of files) {
      if (!(file instanceof File)) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + "-" + file.name;
      await fs.promises.writeFile(path.join(uploadDir, filename), buffer);
      images.push("/uploads/" + filename);
    }

    const createdReview = await prisma.review.create({
      data: {
        orderItemId,
        userId: loginUserId,
        rating,
        content,
        images,
      },
    });

    return NextResponse.json({
      message: "리뷰 등록 성공",
      reviewId: createdReview.id,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json({ error: "리뷰 등록 실패" }, { status: 500 });
  }
}
