import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "관리자 권한이 필요합니다." },
        { status: 403 },
      );
    }

    const productId = Number(params.id);
    const body = await req.json();

    const {
      name,
      description,
      categoryId,
      isCustomizable,
      thumbnail,
      images,
      options,
      optionNames,
      discountType,
      discountValue,
    } = body;

    const currentProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!currentProduct) {
      return NextResponse.json(
        { message: "상품을 찾을 수 없습니다." },
        { status: 404 },
      );
    }

    for (const [index, opt] of options.entries()) {
      const price = Number(opt.price) || 0;
      const dValue = Number(opt.discountValue) || 0;

      if (opt.discountType === "FIXED") {
        if (dValue > price) {
          return NextResponse.json(
            {
              message: `${index + 1}번째 옵션: 할인 금액이 원가를 초과할 수 없습니다.`,
            },
            { status: 400 },
          );
        }
      }

      if (opt.discountType === "PERCENTAGE") {
        if (dValue < 0 || dValue > 100) {
          return NextResponse.json(
            { message: `${index + 1}번째 옵션: 할인율은 0~100%만 가능합니다.` },
            { status: 400 },
          );
        }
      }
    }

    await prisma.$transaction([
      prisma.productOption.deleteMany({ where: { productId } }),

      prisma.product.update({
        where: { id: productId },
        data: {
          name,
          description,
          categoryId: Number(categoryId),
          thumbnail,
          images,
          isCustomizable,
          discountType: discountType || "PERCENTAGE",
          discountValue:
            discountValue === "" || discountValue == null
              ? null
              : Number(discountValue),

          options: {
            create: options.map((opt: any) => ({
              optionName: optionNames.name1,
              optionName2: optionNames.name2 || null,
              optionValue: opt.optionValue,
              optionValue2: opt.optionValue2,
              price: Number(opt.price),
              stock: Number(opt.stock),
              status: opt.status,
              discountType: opt.discountType || "PERCENTAGE",
              discountValue:
                opt.discountValue === "" || opt.discountValue == null
                  ? null
                  : Number(opt.discountValue),
            })),
          },
        },
      }),
    ]);

    return NextResponse.json({ message: "수정 성공" });
  } catch (error) {
    console.error("상품 수정 에러:", error);
    return NextResponse.json({ message: "서버 에러" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "관리자 권한이 필요합니다." },
        { status: 403 },
      );
    }

    const productId = Number(params.id);

    await prisma.$transaction([
      prisma.productOption.deleteMany({ where: { productId } }),
      prisma.product.delete({ where: { id: productId } }),
    ]);

    return NextResponse.json({ message: "삭제 성공" });
  } catch (error) {
    console.error("상품 삭제 에러:", error);
    return NextResponse.json({ message: "삭제 실패" }, { status: 500 });
  }
}
