import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } },
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const productId = Number(params.productId);

  try {
    await prisma.cartItem.deleteMany({
      where: {
        userId: Number(session.user.id),
        productId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "삭제 실패" }, { status: 500 });
  }
}
