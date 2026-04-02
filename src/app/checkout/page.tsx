import { prisma } from "@/lib/prisma";
import CheckoutClientPage from "./page.client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";

type PrismaCartItem = {
  id: number;
  quantity: number;
  option: {
    id: number;
    price: number;
    size: string;
    color: string;
    sale: number | null;
  };
  product: {
    id: number;
    name: string;
    description: string | null;
    thumbnail: string | null;
    isCustomizable: boolean;
  };
};

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

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
              size: true,
              color: true,
              sale: true,
            },
          },

          product: {
            select: {
              id: true,
              name: true,
              description: true,
              thumbnail: true,
              isCustomizable: true,
            },
          },
        },
      }) as Promise<PrismaCartItem[]>,
    ]);

    const formattedCart = memberCart.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      productId: item.product.id,
      name: item.product.name,
      thumbnail: item.product.thumbnail,
      description: item.product.description,
      isCustomizable: item.product.isCustomizable,
      price: item.option.price,
      size: item.option.size,
      color: item.option.color,
      sale: item.option.sale,
    }));

    return (
      <CheckoutClientPage
        memberUser={memberUser}
        memberCart={formattedCart}
        isMember={true}
      />
    );
  }
  return <CheckoutClientPage user={null} isMember={false} />;
}
