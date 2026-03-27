import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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
      paymentMethod,
      customRequest,
      total,
      items,
    } = body;

    const orderNumber = `ORD-${new Date().getTime()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = await prisma.$transaction(async (tx) => {
      return await tx.order.create({
        data: {
          orderNumber,
          status: "PENDING",
          total,
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
            create: items.map((item: any) => ({
              productId: Number(item.productId),
              productName: item.productName,
              quantity: Number(item.quantity),
              unitPrice: Number(item.unitPrice),
              totalPrice: Number(item.unitPrice) * Number(item.quantity),
              optionText: item.optionText || "",
              productImage: item.ProductImage || item.thumbnail || "",
              isCustom: item.isCustomizable || false,
            })),
          },
        },
      });
    });

    return NextResponse.json({
      orderNumber: newOrder.orderNumber,
      message: "Order created as PENDING",
    });
  } catch (error: any) {
    console.error("주문 생성 에러:", error);

    return NextResponse.json(
      { message: "주문 생성 중 오류가 발생했습니다.", error: error.message },
      { status: 500 },
    );
  }
}
