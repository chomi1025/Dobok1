import { getServerSession } from "next-auth";
import BusinessAuthForm from "./page.client";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

export default async function BusinessVerifyPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>로그인이 필요한 서비스입니다.</p>
      </div>
    );
  }

  const userId = Number(session.user.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { businessStatus: true },
  });

  const businessStatus = user?.businessStatus || "NONE";

  return <BusinessAuthForm initialStatus={businessStatus} />;
}
