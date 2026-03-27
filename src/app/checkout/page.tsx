import { prisma } from "@/lib/prisma";
import CheckoutClientPage from "./page.client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";

interface MemberUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  postcode: string;
  address: string;
  detailAddress: string;
}

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  let memberUser: MemberUser | null = null;

  if (session?.user?.id) {
    const dbUser = await prisma.user.findUnique({
      where: { id: Number(session.user.id) },
    });

    if (dbUser) {
      const userAddress = dbUser.address as any;
      memberUser = {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        phone: dbUser.phone || "",
        postcode: userAddress?.postcode || "",
        address: userAddress?.address || "",
        detailAddress: userAddress?.detailAddress || "",
      };
    }
  }

  const isMember = memberUser ? true : false;

  return <CheckoutClientPage user={memberUser} isMember={isMember} />;
}
