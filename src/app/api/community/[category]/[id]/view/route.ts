import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { category: string; id: string } },
) {
  try {
    const { category, id } = params;
    const postId = Number(id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid Post ID" }, { status: 400 });
    }

    await prisma.post.update({
      where: {
        id: postId,
        type: category.toUpperCase(),
      },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === "P2025") {
      console.error(
        `게시글을 찾을 수 없음: ID ${params.id}, Category ${params.category}`,
      );
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    console.error("View Count Update Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
