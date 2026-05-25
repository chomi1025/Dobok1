import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { answer } = await req.json();

  if (!answer?.trim()) {
    return NextResponse.json({ message: "Empty answer" }, { status: 400 });
  }

  await prisma.estimatePost.update({
    where: { id: params.id },
    data: {
      adminReply: answer,
      answeredAt: new Date(),
      status: "DONE",
    },
  });

  return NextResponse.json({ ok: true });
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { answer } = await req.json();

  if (!answer?.trim()) {
    return NextResponse.json({ message: "Empty answer" }, { status: 400 });
  }

  const updated = await prisma.estimatePost.update({
    where: { id: params.id },
    data: {
      adminReply: answer,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user?.role === "ADMIN";

  if (!isAdmin) {
    return NextResponse.json({ message: "권한 없음" }, { status: 403 });
  }

  const estimate = await prisma.estimatePost.findUnique({
    where: { id: params.id },
  });

  if (!estimate) {
    return NextResponse.json({ message: "없음" }, { status: 404 });
  }

  await prisma.estimatePost.update({
    where: { id: params.id },
    data: {
      adminReply: null,
      answeredAt: null,
      status: "WAITING",
    },
  });

  return NextResponse.json({ success: true });
}
