import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("인증되지 않은 사용자입니다.", { status: 401 });
  }

  const targetAuthorId = Number(params.id);
  const viewerId = Number(session.user.id);

  const { searchParams } = new URL(req.url);
  const postId = Number(searchParams.get("postId"));

  try {
    await prisma.contactViewLog.create({
      data: {
        viewerId: viewerId,
        authorId: targetAuthorId,
        postId: postId,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: targetAuthorId },
      select: {
        phone: true,
        email: true,
      },
    });

    return Response.json(user);
  } catch (error) {
    console.error("Log creation failed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
