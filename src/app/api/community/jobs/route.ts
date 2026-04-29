import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const postWithAuthor = Prisma.validator<Prisma.PostDefaultArgs>()({
  include: { author: { select: { name: true, nickname: true } } },
});

type PostWithAuthor = Prisma.PostGetPayload<typeof postWithAuthor>;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const pageSize = 10;
    const skip = (page - 1) * pageSize;
    const type = searchParams.get("type")?.toUpperCase();

    const whereClause: any = {
      type: "JOB",
    };

    if (type === "HIRING" || type === "SEEKING") {
      whereClause.jobType = type;
    }

    const [jobs, total] = await Promise.all([
      prisma.post.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
        include: {
          author: {
            select: {
              name: true,
              nickname: true,
            },
          },
        },
      }),
      prisma.post.count({ where: whereClause }),
    ]);

    const formattedJobs = jobs.map((job: PostWithAuthor) => ({
      id: job.id,
      type: job.jobType,
      jobRole: job.jobRole,
      title: job.title,
      companyName: job.companyName,
      authorName: job.author?.nickname || job.author?.name || "개인",
      experience: job.experience,
      city: job.city,
      district: job.district,
      createdAt: job.createdAt,
    }));

    return NextResponse.json({
      jobs: formattedJobs,
      total,
    });
  } catch (error) {
    console.error("Jobs API Error:", error);
    return NextResponse.json(
      { error: "데이터를 불러오는 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
