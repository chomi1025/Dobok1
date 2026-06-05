import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { uploadImage } from "@/components/lib/uploadImage";

export async function POST(req: Request) {
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

  try {
    const formData = await req.formData();

    const orderItemId = Number(formData.get("orderItemId"));
    const rating = Number(formData.get("rating"));
    const content = String(formData.get("content") ?? "");
    const files = formData.getAll("images") as File[];

    const userId = Number(session.user.id);

    // 유효성 검사
    if (!orderItemId) {
      return NextResponse.json(
        {
          message: "상품 정보가 없습니다.",
        },
        {
          status: 400,
        },
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          message: "별점이 올바르지 않습니다.",
        },
        {
          status: 400,
        },
      );
    }

    if (content.trim().length < 5) {
      return NextResponse.json(
        {
          message: "리뷰를 5자 이상 작성해주세요.",
        },
        {
          status: 400,
        },
      );
    }

    const orderItem = await prisma.orderItem.findUnique({
      where: {
        id: orderItemId,
      },
      include: {
        order: true,
        reviews: true,
      },
    });

    if (!orderItem) {
      return NextResponse.json(
        {
          message: "상품을 찾을 수 없습니다.",
        },
        {
          status: 404,
        },
      );
    }

    if (!orderItem.order) {
      return NextResponse.json(
        {
          message: "주문 정보를 찾을 수 없습니다.",
        },
        {
          status: 404,
        },
      );
    }

    if (orderItem.order.userId !== userId) {
      return NextResponse.json(
        {
          message: "본인 주문만 리뷰 작성이 가능합니다.",
        },
        {
          status: 403,
        },
      );
    }

    if (orderItem.order.status !== "DELIVERED") {
      return NextResponse.json(
        {
          message: "배송완료 상품만 리뷰 작성이 가능합니다.",
        },
        {
          status: 400,
        },
      );
    }

    if (orderItem.reviews) {
      return NextResponse.json(
        {
          message: "이미 리뷰를 작성한 상품입니다.",
        },
        {
          status: 400,
        },
      );
    }

    const imageUrls = await Promise.all(
      files.map((file) => uploadImage(file, "Dobok1/reviews")),
    );

    await prisma.review.create({
      data: {
        userId,
        orderItemId,
        rating,
        content,
        images: imageUrls,
      },
    });

    return NextResponse.json({
      success: true,
      message: "리뷰가 등록되었습니다.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "리뷰 등록 중 오류가 발생했습니다.",
      },
      {
        status: 500,
      },
    );
  }
}
