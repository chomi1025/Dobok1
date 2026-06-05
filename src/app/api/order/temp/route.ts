import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      receiverName,
      postcode,
      address,
      detailAddress,
      cellphone,
      customRequest,
      total,
      items,
      orderNumber,
      productImage,
      userId,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { message: "상품이 없습니다." },
        { status: 400 },
      );
    }

    const existing = await prisma.order.findFirst({
      where: { orderNumber },
    });

    if (existing) {
      return NextResponse.json({
        orderNumber: existing.orderNumber,
        message: "ALREADY_EXISTS",
      });
    }

    const tempOrder = await prisma.order.create({
      data: {
        orderNumber,
        total: Number(total),
        status: "PENDING",
        userId,
        productImage,
        buyerName: name,
        buyerEmail: email,
        buyerPhone: phone,

        receiverName,
        receiverPhone: cellphone,
        postcode,
        address,
        detailAddress,
        customRequest,

        items: {
          create: items.map((item: any) => {
            const qty = Number(item.quantity) || 0;

            const originPrice =
              Number(
                item.originalPrice ?? item.originPrice ?? item.unitPrice,
              ) || 0;

            const salePrice = Number(item.salePrice ?? item.unitPrice) || 0;

            const unitPrice = salePrice;

            const totalPrice = unitPrice * qty;

            const discountRate =
              originPrice > salePrice && originPrice > 0
                ? Math.round(((originPrice - salePrice) / originPrice) * 100)
                : 0;


            return {
              productId: item.productId,
              productName: item.productName,
              productImage: item.productImage,

              quantity: qty,

              unitPrice,
              totalPrice,

              originPrice,
              salePrice,
              discountRate,

              optionText: item.optionText,
              isCustom: item.isCustomizable || false,
            };
          }),
        },
      },
      include: {
        items: true,
      },
    });



    return NextResponse.json({
      orderNumber: tempOrder.orderNumber,
      message: "TEMP_ORDER_CREATED",
    });
  } catch (error: any) {
    console.error("TEMP 주문 생성 에러:", error);

    return NextResponse.json(
      {
        message: "임시 주문 생성 실패",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
