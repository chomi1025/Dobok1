import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(params.id), type: "JOB" },
      include: {
        author: {
          select: { nickname: true, email: true, phone: true },
        },
      },
    });

    if (!post)
      return NextResponse.json({ error: "Not Found" }, { status: 404 });

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  await prisma.post.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}
