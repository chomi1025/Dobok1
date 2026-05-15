import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { OrderStatus, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const period = searchParams.get("period");
  const status = searchParams.get("status") as OrderStatus | "ALL" | null;
  const search = searchParams.get("search");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  let where: Prisma.OrderWhereInput = {};

  if (period) {
    const now = new Date();
    const start = new Date();

    if (period === "today") {
      start.setHours(0, 0, 0, 0);
      where.createdAt = { gte: start, lte: now };
    } else if (period === "7days") {
      start.setDate(now.getDate() - 7);
      where.createdAt = { gte: start, lte: now };
    } else if (period === "30days") {
      start.setDate(now.getDate() - 30);
      where.createdAt = { gte: start, lte: now };
    } else if (period === "customDate" && startDate && endDate) {
      where.createdAt = {
        gte: new Date(`${startDate}T00:00:00`),
        lte: new Date(`${endDate}T23:59:59`),
      };
    }
  }

  if (status && status !== "ALL") {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: "insensitive" } },
      { buyerName: { contains: search, mode: "insensitive" } },
      {
        items: {
          some: { productName: { contains: search, mode: "insensitive" } },
        },
      },
    ];
  }

  try {
    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: { items: true },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({ orders, total });
  } catch (error) {
    return NextResponse.json({ error: "데이터 추출 실패" }, { status: 500 });
  }
}

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
      const qty = Number(item.quantity) || 0;
      const unitPrice = Number(item.unitPrice) || 0;

      calculatedTotal += unitPrice * qty;
    }

    // 배송비
    const deliveryFee = calculatedTotal >= 50000 ? 0 : 3000;
    const finalServerTotal = calculatedTotal + deliveryFee;

    if (Math.abs(finalServerTotal - Number(total)) > 1) {
      return NextResponse.json(
        { message: "결제 금액 위변조 감지" },
        { status: 400 },
      );
    }

    const orderNumber = `HS${new Date()
      .toISOString()
      .slice(2, 10)
      .replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

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

            receiverName,
            receiverPhone: cellphone,
            postcode,
            address,
            detailAddress,
            customRequest,

            ...(session?.user?.id && {
              user: {
                connect: { id: Number(session.user.id) },
              },
            }),

            items: {
              create: items.map((item: any) => {
                const unitPrice = Number(item.unitPrice) || 0;
                const qty = Number(item.quantity) || 0;

                const originalPrice = Number(item.originalPrice) || unitPrice;
                const salePrice = unitPrice;

                const discountRate =
                  originalPrice > salePrice
                    ? Math.round(
                        ((originalPrice - salePrice) / originalPrice) * 100,
                      )
                    : 0;

                return {
                  productId: item.productId,
                  productName: item.productName,
                  productImage: item.ProductImage,

                  quantity: qty,
                  unitPrice,

                  totalPrice: unitPrice * qty,

                  originPrice: originalPrice,
                  salePrice,
                  discountRate,

                  optionText: item.optionText,
                  isCustom: item.isCustomizable || false,
                };
              }),
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
      {
        message: "주문 생성 중 오류가 발생했습니다.",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
