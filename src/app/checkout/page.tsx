import { prisma } from "@/lib/prisma";
import CheckoutClientPage from "./page.client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { PromotionType } from "@prisma/client";

type PrismaCartItem = {
  id: number;
  quantity: number;

  option: {
    id: number;
    price: number;

    optionName: string | null;
    optionValue: string | null;

    optionName2: string | null;
    optionValue2: string | null;

    discountType: PromotionType | null;
    discountValue: number | null;
  };

  product: {
    id: number;
    name: string;
    description: string | null;
    thumbnail: string | null;
    isCustomizable: boolean;

    discountType: PromotionType | null;
    discountValue: number | null;
  };
};

function calcDiscountPrice(
  price: number,
  discountType: PromotionType | null,
  discountValue: number | null,
) {
  if (!discountType || !discountValue) return price;

  if (discountType === "PERCENTAGE") {
    return Math.floor(price * (1 - discountValue / 100));
  }

  if (discountType === "FIXED") {
    return Math.max(0, price - discountValue);
  }

  return price;
}

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  // 회원이면
  if (session?.user?.id) {
    const [memberUser, memberCart] = await Promise.all([
      prisma.user.findUnique({
        where: { id: Number(session.user.id) },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          address: true,
        },
      }),

      prisma.cartItem.findMany({
        where: { userId: Number(session.user.id) },
        select: {
          id: true,
          quantity: true,

          option: {
            select: {
              id: true,
              price: true,

              optionName: true,
              optionValue: true,

              optionName2: true,
              optionValue2: true,

              discountType: true,
              discountValue: true,
            },
          },

          product: {
            select: {
              id: true,
              name: true,
              description: true,
              thumbnail: true,
              isCustomizable: true,

              discountType: true,
              discountValue: true,
            },
          },
        },
      }) as Promise<PrismaCartItem[]>,
    ]);

    const formattedCart = memberCart.map((item) => {
      let finalPrice = item.option.price;

      finalPrice = calcDiscountPrice(
        finalPrice,
        item.product.discountType,
        item.product.discountValue,
      );

      finalPrice = calcDiscountPrice(
        finalPrice,
        item.option.discountType,
        item.option.discountValue,
      );

      return {
        id: item.id,
        optionId: item.option.id,
        quantity: item.quantity,

        productId: item.product.id,
        name: item.product.name,
        thumbnail: item.product.thumbnail,
        description: item.product.description,
        isCustomizable: item.product.isCustomizable,

        originalPrice: item.option.price,
        price: finalPrice,

        optionName: item.option.optionName,
        optionValue: item.option.optionValue,

        optionName2: item.option.optionName2,
        optionValue2: item.option.optionValue2,
      };
    });
    return (
      <CheckoutClientPage
        memberUser={memberUser}
        memberCart={formattedCart}
        isMember={true}
      />
    );
  }

  // 비회원
  return <CheckoutClientPage user={null} isMember={false} />;
}
