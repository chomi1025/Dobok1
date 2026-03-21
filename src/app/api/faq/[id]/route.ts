import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    await prisma.faq.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "삭제 성공" });
  } catch (error) {
    return NextResponse.json({ message: "삭제 실패" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const { category, question, answer } = await req.json();

  await prisma.faq.update({
    where: { id: Number(params.id) },
    data: { category, question, answer },
  });

  return NextResponse.json({ message: "수정 성공" });
}
