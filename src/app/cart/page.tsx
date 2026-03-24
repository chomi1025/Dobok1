import { getServerSession } from "next-auth";
import CartClientPage from "./page.client";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

export default async function CartPage() {
  const session = await getServerSession(authOptions);

  // 비회원이면
  if (!session) {
    return <CartClientPage user={null} initialItems={[]} />;
  }

  // 회원이면
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: Number(session.user.id) },
    include: {
      product: true,
      option: true,
    },
  });

  return <CartClientPage user={session.user} initialItems={cartItems} />;
}
