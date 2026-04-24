import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
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

    await prisma.$transaction([
      prisma.productOption.deleteMany({ where: { productId } }),

      prisma.product.update({
        where: { id: productId },
        data: {
          name,
          description,
          categoryId: Number(categoryId),
          thumbnail: thumbnail,
          images: images,
          isCustomizable,
          options: {
            create: options.map((opt: any) => ({
              optionName: optionNames.name1,
              optionName2: optionNames.name2,
              optionValue: opt.optionValue,
              optionValue2: opt.optionValue2,
              price: Number(opt.price),
              stock: Number(opt.stock),
              status: opt.status,
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
