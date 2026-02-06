import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Params {
  params: {
    orderItemId: string;
  };
}

export async function GET(req: Request, { params }: Params) {
  const orderItemId = Number(params.orderItemId);

  if (isNaN(orderItemId)) {
    return NextResponse.json(
      { message: "잘못된 orderItemId" },
      { status: 400 },
    );
  }

  const item = await prisma.orderItem.findUnique({
    where: { id: orderItemId },
    include: {
      reviews: true,
    },
  });

  if (!item) {
    return NextResponse.json(
      { message: "주문 상품을 찾을 수 없습니다." },
      { status: 404 },
    );
  }

  if (item.reviews.length > 0) {
    return NextResponse.json(
      {
        canWrite: false,
        message: "이미 리뷰를 작성한 상품입니다.",
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      canWrite: true,
      orderItemId: item.id,
      productName: item.productName,
      img: item.productImage || "/sample.png",
    },
    { status: 200 },
  );
}
