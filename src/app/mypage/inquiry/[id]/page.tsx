import { prisma } from "@/lib/prisma";
import { notFound, redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import styles from "./page.module.scss";
import { InquiryCategory } from "@prisma/client";
import Button from "@/components/common/buttons/page";
import DeleteButton from "../../components/DeleteButton";

const CategoryChange: Record<InquiryCategory, string> = {
  PRODUCT: "상품문의",
  DELIVERY: "배송문의",
  ORDER: "주문문의",
  RETURN: "취소·반품문의",
  OTHER: "기타문의",
};
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function InquiryDetailPage({ params }: Props) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const inquiry = await prisma.inquiry.findFirst({
    where: {
      id: Number(id),
      userId: Number(session?.user?.id),
    },
    include: {
      replies: true,
    },
  });

  if (!inquiry) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>1:1 문의 상세</h1>
      </header>

      <section className={styles.infoBox}>
        <div className={styles.row}>
          <span className={styles.label}>문의유형</span>
          <span> {CategoryChange[inquiry.category as InquiryCategory]}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>작성일</span>
          <span>{new Date(inquiry.createdAt).toLocaleDateString("ko-KR")}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>상태</span>

          <span
            className={
              inquiry.status === "ANSWERED" ? styles.done : styles.wait
            }
          >
            {inquiry.status === "ANSWERED" ? "답변완료" : "답변대기"}
          </span>
        </div>
      </section>

      <section className={styles.contentBox}>
        <div className={styles.contentHeader}>
          <h2>문의내용</h2>

          {!inquiry.replies && (
            <div className={styles.actions}>
              <Button
                variant="outline"
                href={`/mypage/inquiry/${inquiry.id}/edit`}
              >
                수정
              </Button>

              <DeleteButton id={inquiry.id} />
            </div>
          )}
        </div>

        <div className={styles.content}>{inquiry.content}</div>
      </section>

      {inquiry.replies ? (
        <section className={styles.replyBox}>
          <div className={styles.replyHeader}>
            <span>관리자 답변</span>

            <span className={styles.replyDate}>
              {new Date(inquiry.replies.createdAt).toLocaleDateString("ko-KR")}
            </span>
          </div>

          <div className={styles.replyContent}>{inquiry.replies.content}</div>
        </section>
      ) : (
        <section className={styles.replyBox}>
          <div className={styles.replyHeader}>관리자 답변</div>

          <div className={styles.emptyReply}>아직 등록된 답변이 없습니다.</div>
        </section>
      )}

      <div className={styles.buttonArea}>
        <Button variant="edit" href="/mypage/inquiry">
          목록으로
        </Button>
      </div>
    </div>
  );
}
