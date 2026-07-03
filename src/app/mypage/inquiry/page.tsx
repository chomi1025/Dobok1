import { prisma } from "@/lib/prisma";
import InquiryClientPage from "./page.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";

export type InquiryType =
  | "배송문의"
  | "반품/환불"
  | "교환문의"
  | "주문/결제"
  | "상품문의"
  | "회원정보"
  | "기타";

export interface Inquiry {
  id: number;
  inquiryType: InquiryType;
  img: string;
  inquiryTitle: string;
  inquiryAt: string;
  inquiryStatus: "답변대기" | "답변완료";
}

export default async function InquiryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const inquiries = await prisma.Inquiry.findMany({
    where: {
      userId: Number(session.user.id),
    },
  });

  return <InquiryClientPage inquiries={inquiries} />;
}
