import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/options";

// 로그인 체크 !
export async function checkBannedUser() {
  const session = await getServerSession(authOptions);

  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: Number(session.user.id) },
      select: { status: true },
    });

    if (user?.status === "BANNED") {
      redirect("/banned");
    }
  }
}
