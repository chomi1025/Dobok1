import { Metadata } from "next";
import styles from "./page.module.scss";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import EstimateTable from "./_component/EstimateTable";
import PagenationComponent from "@/components/pagenation/page";

export interface EstimatePost {
  id: string;
  title: string;
  writer: string;
  status: "WAITING" | "PROCESSING" | "DONE";
  createdAt: Date;
  productName?: string;
  quantity?: number;
  isSecret?: boolean;
}

export const metadata: Metadata = {
  title: "단체복 견적문의 | 도복일번지",

  description:
    "검도복, 태권도복, 유도복, 합기도복 등 단체 주문 견적을 빠르게 문의해보세요. 체육관 · 학교 · 동아리 맞춤 상담 가능.",

  keywords: [
    "도복 견적",
    "단체복 견적",
    "검도복 단체주문",
    "태권도복 견적",
    "유도복 단체주문",
    "합기도복 견적",
    "도복 제작",
    "체육관 단체복",
    "도복일번지",
  ],

  openGraph: {
    title: "단체복 견적문의 | 도복일번지",
    description: "체육관 · 학교 · 동아리 단체복 견적을 빠르게 상담해드립니다.",
    url: "https://dobok1.vercel.app/estimate",
    siteName: "도복일번지",
    locale: "ko_KR",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

interface Props {
  searchParams: {
    page?: string;
    status?: "WAITING" | "PROCESSING" | "DONE";
  };
}

export default async function EstimatePage({ searchParams }: Props) {
  const currentPage = Number(searchParams.page || 1);

  const pageSize = 10;

  const status = searchParams.status;

  const estimates = await prisma.estimatePost.findMany({
    where: {
      deletedAt: null,
      ...(status && { status }),
    },
    select: {
      writer: true,
      createdAt: true,
      title: true,
      status: true,
      id: true,
    },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalCount = await prisma.estimatePost.count({
    where: {
      deletedAt: null,
      ...(status && { status }),
    },
  });

  const formattedEstimates = estimates.map((item: EstimatePost) => ({
    ...item,

    id: String(item.id),

    createdAt: item.createdAt.toISOString().split("T")[0].replaceAll("-", "."),
  }));

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topBar}>
          <div className={styles.totalCount}>
            총 <strong>{totalCount}</strong>개의 문의
          </div>

          <Link href={"/estimate/new"} className={styles.writeButton}>
            견적문의 작성
          </Link>
        </div>

        <EstimateTable
          estimates={formattedEstimates}
          totalCount={totalCount}
          currentPage={currentPage}
          pageSize={pageSize}
        />

        <PagenationComponent
          total={estimates.length}
          pageSize={pageSize}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}
