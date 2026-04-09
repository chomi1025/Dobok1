import CartClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "장바구니 | 도복일번지",
  description: "선택하신 도복과 용품들을 확인하고 주문을 진행하세요.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CartPage() {
  // 세션체크
  const session = await getServerSession(authOptions);

  let initialCart = [];

  // 회원이면 카트 서버에서 불러오기
  if (session) {
    initialCart = await prisma.cartItem.findMany({
      where: {
        userId: Number(session.user.id),
      },

      include: {
        product: true,
      },
    });
  }

  return <CartClientPage session={session} initialCart={initialCart} />;
}
