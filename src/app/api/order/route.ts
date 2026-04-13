import { authOptions } from "@/lib/auth/options";
import { PrismaClient, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
interface VerifiedItem {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  optionText: string;
  isCustom: boolean;
}

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

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
    } = body;

    let calculatedTotal = 0;

    for (const item of items) {
      const targetOptionId = Number(item.optionId);

      const option = await prisma.productOption.findUnique({
        where: { id: targetOptionId },
      });

      if (option) {
        const price = Number(option.price) || 0;
        const qty = Number(item.quantity) || 0;
        calculatedTotal += price * qty;
      }
    }

    const deliveryFee = calculatedTotal >= 50000 ? 0 : 3000;
    const finalServerTotal = calculatedTotal + deliveryFee;

    if (finalServerTotal !== Number(total)) {
      return NextResponse.json(
        { message: "결제 금액 위변조 감지" },
        { status: 400 },
      );
    }

    // 주문 생성
    const orderNumber = `HS${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

    const order = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const newOrder = await tx.order.create({
          data: {
            orderNumber,
            total: finalServerTotal,
            status: "PENDING",

            buyerName: name,
            buyerEmail: email,
            buyerPhone: phone,

            receiverName: receiverName,
            receiverPhone: cellphone,
            postcode: postcode,
            address: address,
            detailAddress: detailAddress,
            customRequest: customRequest,

            ...(session?.user?.id && {
              user: {
                connect: { id: Number(session.user.id) },
              },
            }),

            items: {
              create: items.map((item: any) => ({
                productId: item.productId,
                productName: item.productName,
                productImage: item.ProductImage,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                totalPrice: item.unitPrice * item.quantity, //
                optionText: item.optionText,
                isCustom: item.isCustomizable || false, //
              })),
            },
          },
        });
        return newOrder;
      },
    );

    return NextResponse.json({
      orderNumber: order.orderNumber,
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
