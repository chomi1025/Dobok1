import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;

    const categoryId = isNaN(Number(id)) ? id : Number(id);

    const productCount = await prisma.product.count({
      where: {
        categoryId: categoryId,
      },
    });

    return NextResponse.json({ productCount });
  } catch (error: any) {
    console.error("❌ Prisma 에러 발생:", error.message);
    return NextResponse.json(
      { error: "서버 내부 오류", details: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;
    const categoryId = isNaN(Number(id)) ? id : Number(id);

    const body = await request.json();
    const { name, slug, isVisible, parentId, sortOrder } = body;

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && { slug }),
        ...(isVisible !== undefined && {
          isVisible: isVisible === "true" || isVisible === true,
        }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
        ...(parentId !== undefined && {
          parentId:
            parentId === null
              ? null
              : isNaN(Number(parentId))
                ? parentId
                : Number(parentId),
        }),
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    console.error("❌ 카테고리 수정 에러:", error.message);
    return NextResponse.json(
      { error: "수정 중 오류가 발생했습니다.", details: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const id = params.id;
    const categoryId = isNaN(Number(id)) ? id : Number(id);

    const categoryWithChildren = await prisma.category.findUnique({
      where: { id: categoryId },
      include: { children: true },
    });

    if (!categoryWithChildren) {
      return NextResponse.json(
        { error: "존재하지 않는 카테고리입니다." },
        { status: 404 },
      );
    }

    const targetIds = [
      categoryId,
      ...(categoryWithChildren.children?.map((child: any) => child.id) || []),
    ];

    const productCount = await prisma.product.count({
      where: {
        categoryId: { in: targetIds as any },
      },
    });

    if (productCount > 0) {
      return NextResponse.json(
        {
          error: `이 카테고리 혹은 하위 카테고리에 등록된 상품이 ${productCount}개 있습니다.\n상품을 먼저 이동하거나 삭제해주세요.`,
        },
        { status: 400 },
      );
    }

    await prisma.category.delete({
      where: { id: categoryId },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ 삭제 에러:", error.message);
    return NextResponse.json(
      { error: "삭제 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
