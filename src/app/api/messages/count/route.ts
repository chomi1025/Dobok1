import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return Response.json({ count: 0 });

  const count = await prisma.message.count({
    where: { receiverId: Number(session.user.id), isRead: false },
  });
  return Response.json({ count });
}
