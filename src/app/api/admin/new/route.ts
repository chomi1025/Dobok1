import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (
      !body.name ||
      !body.thumbnail ||
      !body.categoryId ||
      !body.material ||
      !body.origin ||
      body.options.length === 0
    ) {
      return NextResponse.json(
        {
          message:
            "상품명, 가격/옵션, 재고/옵션, 대표 이미지, 카테고리 필수입니다",
        },
        { status: 400 },
      );
    }

    // options 배열 없으면 단일 옵션으로 만들어주기
    const optionsData =
      body.options && body.options.length > 0
        ? body.options
        : [
            {
              name: "기본 옵션",
              price: Number(body.price),
              stock: Number(body.stock),
              color: "기본색상",
              size: "기본사이즈",
              status: "판매중",
            },
          ];

    // 실제 DB 저장
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        thumbnail: body.thumbnail,
        images: body.images || [],
        origin: body.origin,
        material: body.material,
        categoryId: body.categoryId,
        options: {
          create: optionsData,
        },
      },
    });

    return NextResponse.json(
      { message: "상품 등록 성공", product },
      { status: 201 },
    );
  } catch (error) {
    console.error("상품 등록 오류:", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
