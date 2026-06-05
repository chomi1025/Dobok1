import { getServerSession } from "next-auth";
import ClaimDetailClientPage from "./page.client";
import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/prisma";

type ClaimType = "CANCEL" | "EXCHANGE" | "RETURN";
type ClaimStatus = "REQUESTED" | "APPROVED" | "COMPLETED" | "REJECTED";

// 2. 전체 데이터 구조
export interface ClaimDetailData {
  claimNumber: string;
  type: ClaimType;
  status: ClaimStatus;
  requestedAt: string;
  processedAt?: string | null;
  name: string;
  img: string | null;
  quantity: number;
  total: number;
  reason: string;
  detail: string;
}

const MOCK_CLAIM_DETAIL: ClaimDetailData = {
  claimNumber: "C-20260405-123",
  type: "RETURN",
  status: "APPROVED",
  requestedAt: "2026-04-05 14:30",
  processedAt: "2026-04-06 10:00",
  name: "프리미엄 선수용 도복 - 화이트",
  img: "https://via.placeholder.com/70",
  quantity: 1,
  total: 125000,
  reason: "단순 변심",
  detail: "사이즈가 생각보다 커서 반품하고 싶습니다. 미개봉 상태입니다.",
};

export default async function ClaimPage({
  params,
}: {
  params: { claimNumber: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>로그인이 필요합니다.</div>;
  }

  const claim = await prisma.claim.findUnique({
    where: { claimNumber: params.claimNumber },
    include: {
      order: {
        include: {
          items: true,
        },
      },
    },
  });

  if (!claim) {
    return <div>클레임 없음</div>;
  }

  if (claim.userId !== Number(session.user.id)) {
    return <div>권한 없음</div>;
  }

  const formatted = {
    claimNumber: claim.claimNumber,
    claimType: claim.claimType,
    status: claim.status,
    requestedAt: claim.requestedAt,
    processedAt: claim.processedAt,
    reason: claim.reason,
    detail: claim.detail,
    items: claim.order?.items ?? [],
  };

  return <ClaimDetailClientPage claim={formatted} />;
}
