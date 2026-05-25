import { prisma } from "@/lib/prisma";
import styles from "./page.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EstimateActionButtons from "../_component/EstimateActionButton";
import AdminAnswer from "../_component/AdminAnswer";

interface Props {
  params: {
    id: string;
  };
}

export default async function EstimateDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  const cookieStore = await cookies();

  const estimate = await prisma.estimatePost.findUnique({
    where: {
      id: params.id,
    },
    select: {
      title: true,
      content: true,
      writer: true,
      phone: true,
      email: true,
      createdAt: true,
      status: true,
      userId: true,
      adminReply: true,
      answeredAt: true,
      product: {
        select: {
          name: true,
          thumbnail: true,
        },
      },
    },
  });

  if (!estimate) redirect("/estimate");

  const isOwner =
    estimate.userId && session && Number(session.user.id) === estimate.userId;

  const isAdmin = session?.user?.role === "ADMIN";

  const hasCookie = cookieStore.get(`estimate_access_${params.id}`);
  const canEdit =
    (session?.user?.id && Number(session.user.id) === estimate.userId) ||
    hasCookie;
  const canView = isOwner || hasCookie || isAdmin;

  if (!canView) {
    redirect(`/estimate/${params.id}/verify`);
  }

  const createDate = new Date(estimate.createdAt);
  const answerDate = new Date(estimate.answeredAt);

  const formatted = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(date.getDate()).padStart(2, "0")} ${String(
      date.getHours(),
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  return (
    <main className={styles.container}>
      {/* 상단 */}
      <section className={styles.topSection}>
        <div className={styles.badges}>
          <span className={styles.status}>답변대기</span>

          <span className={styles.secret}>비밀글</span>
        </div>

        <h1 className={styles.title}>{estimate.title}</h1>

        <div className={styles.meta}>
          <span>{estimate.writer}</span>
          <span>{formatted(createDate)}</span>
        </div>
      </section>

      {/* 상품 정보 */}
      <section className={styles.productSection}>
        <h2>문의 상품</h2>

        <div className={styles.productCard}>
          <Image
            width={70}
            height={70}
            src={estimate?.product?.thumbnail}
            alt={estimate?.product?.name}
          />

          <div className={styles.productInfo}>
            <strong>{estimate?.product?.name}</strong>
          </div>
        </div>
      </section>

      {/* 문의 내용 */}
      <section className={styles.contentSection}>
        <h2>문의 내용</h2>

        <div className={styles.content}>{estimate.content}</div>
      </section>

      {estimate.adminReply && !isAdmin && (
        <section className={styles.adminAnswerSection}>
          <h2>답변</h2>

          <div className={styles.answerView}>{estimate.adminReply}</div>

          {estimate.answeredAt && (
            <div className={styles.meta}>{formatted(answerDate)}</div>
          )}
        </section>
      )}

      {isAdmin && (
        <AdminAnswer
          id={params.id}
          initialAnswer={estimate.adminReply}
          estimate={estimate}
          answeredAt={estimate.answeredAt}
        />
      )}

      {/* 하단 버튼 */}
      <div className={styles.bottomButtons}>
        <Link href="/estimate" className={styles.listButton}>
          목록으로
        </Link>

        <div className={styles.actionGroup}>
          {canEdit && (
            <Link
              className={styles.editButton}
              href={`/estimate/${params.id}/edit`}
            >
              수정
            </Link>
          )}

          <EstimateActionButtons id={params.id} />
        </div>
      </div>
    </main>
  );
}
