import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      userId,
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
    } = body;

    const orderNumber = `HS${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        return await tx.order.create({
          data: {
            userId: userId || null,
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
                totalPrice: Number(item.unitPrice) * Number(item.quantity),
                unitPrice: Number(item.unitPrice),
                optionText: item.optionText || "",
                isCustom: item.isCustomizable || false,
              })),
            },
          },
        });
      },
    );

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
