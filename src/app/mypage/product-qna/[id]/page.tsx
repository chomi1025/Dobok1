import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import styles from "./page.module.scss";
import Button from "@/components/common/buttons/page";
import DeleteButton from "../../components/DeleteButton";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductQnaDetailPage({ params }: Props) {
  const { id } = await params;

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const qna = await prisma.ProductQna.findFirst({
    where: {
      id: Number(id),
      userId: Number(session?.user?.id),
    },
    include: {
      reply: true,
    },
  });

  console.log(qna);

  if (!qna) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>상품 문의 상세</h1>
      </header>

      <section className={styles.infoBox}>
        {!qna.reply && (
          <div className={styles.actions}>
            <Button
              variant="outline"
              href={`/mypage/product-qna/${qna.id}/edit`}
            >
              수정
            </Button>

            <DeleteButton id={qna.id} />
          </div>
        )}

        <div className={styles.row}>
          <span className={styles.label}>작성일</span>
          <span>{new Date(qna.createdAt).toLocaleDateString("ko-KR")}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>상태</span>

          <span className={qna.reply ? styles.done : styles.wait}>
            {qna.reply ? "답변완료" : "답변대기"}
          </span>
        </div>
      </section>

      <section className={styles.contentBox}>
        <div className={styles.contentHeader}>
          <h2>문의내용</h2>
        </div>

        <div className={styles.content}>{qna.content}</div>
      </section>

      {qna.reply ? (
        <section className={styles.replyBox}>
          <div className={styles.replyHeader}>
            <span>관리자 답변</span>

            <span className={styles.replyDate}>
              {new Date(qna.reply.createdAt).toLocaleDateString("ko-KR")}
            </span>
          </div>

          <div className={styles.replyContent}>{qna.replies.content}</div>
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
