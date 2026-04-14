"use client";
import styles from "./page.module.scss";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { CITY_OPTIONS } from "@/constants/regions";
import Button from "@/components/common/buttons/page";
import { EXPERIENCE_MAP, JOB_ROLE_MAP } from "@/constants/jobs";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function JobsDetailClientPage({ post }: { post: any }) {
  const { data: session } = useSession();
  const router = useRouter();

  const isAuthor = Number(session?.user?.id) === post?.authorId;

  const isAdmin = session?.user?.role === "ADMIN";

  const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    toast.success("삭제되었습니다.");
    router.push("/community/jobs");
  };

  //   입력값 정화
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  //   연락처 숨기기
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (post?.content) {
      setSanitizedHtml(DOMPurify.sanitize(post.content));
    }
  }, [post?.content]);

  const getApplyMethods = (methods: string) => {
    if (!methods) return "전화문의";
    return methods
      .split(",")
      .map((m) => {
        if (m === "PHONE") return "전화";
        if (m === "MESSAGE") return "문자";
        if (m === "EMAIL") return "이메일";
        return m;
      })
      .join(", ");
  };

  return (
    <>
      <div className={styles.inner}>
        <header>
          <h1>구인·구직게시판</h1>

          <div className={styles.btnWrapper}>
            {isAuthor ? (
              <>
                <Button
                  href={`/community/jobs/${post?.id}/edit`}
                  variant="edit"
                >
                  수정
                </Button>

                <Button
                  variant="delete"
                  className={styles.deleteBtn}
                  onClick={handleDelete}
                >
                  삭제
                </Button>
              </>
            ) : (
              isAdmin && (
                <Button
                  variant="delete"
                  className={styles.deleteBtn}
                  onClick={handleDelete}
                >
                  관리자 삭제
                </Button>
              )
            )}
          </div>
        </header>

        <article className={styles.postCard}>
          <header className={styles.postHeader}>
            <div className={styles.topInfo}>
              <span className={`${styles.badge} ${styles.jobType}`}>
                {post?.jobType === "HIRING" ? "구인" : "구직"}
              </span>
              <span className={`${styles.badge} ${styles.jobRole}`}>
                {JOB_ROLE_MAP[post?.jobRole] || post?.jobRole}
              </span>
            </div>

            <h2 className={styles.postTitle}>{post?.title}</h2>

            <ul className={styles.metaList}>
              <li>{post?.companyName}</li>
              <li>
                {`${CITY_OPTIONS.find((opt) => opt.value === post?.city)?.label || post?.city} ${post?.district}`}
              </li>
              <li>
                <time>{new Date(post?.createdAt).toLocaleDateString()}</time>
              </li>
              <li>조회수 {post?.viewCount}</li>
            </ul>
          </header>

          <section className={styles.summaryBox}>
            <div className={styles.infoItem}>
              <span className={styles.label}>경력사항</span>
              <span className={styles.value}>
                {EXPERIENCE_MAP[post?.experience] || post?.experience}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>지원방법</span>
              <span className={styles.value}>
                {getApplyMethods(post?.applyMethod)}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>모집종목</span>
              <span className={styles.value}>
                {JOB_ROLE_MAP[post?.jobRole] || post?.jobRole}
              </span>
            </div>
          </section>

          <section className={styles.postContent}>
            <h3 className={styles.visuallyHidden}>상세 내용</h3>
            <div
              className="ql-editor"
              style={{ padding: 0 }}
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
            />
          </section>

          <footer className={styles.postFooter}>
            <section className={styles.applySection}>
              <h3 className={styles.applyTitle}>지원 방법</h3>
              <div className={styles.applyContent}>
                <p className={styles.applyMethods}>
                  방법: <strong>{getApplyMethods(post?.applyMethod)}</strong>
                </p>

                <div className={styles.contactInfo}>
                  {showContact ? (
                    <div className={styles.realContact}>
                      {post?.applyMethod.includes("PHONE") && (
                        <span>📞 {post?.phoneNumber}</span>
                      )}
                      {post?.applyMethod.includes("EMAIL") && (
                        <span>✉️ {post?.email}</span>
                      )}
                    </div>
                  ) : (
                    <button
                      className={styles.revealBtn}
                      onClick={() => setShowContact(true)}
                    >
                      채용 담당자 연락처 보기
                    </button>
                  )}
                </div>
              </div>
            </section>

            <div className={styles.btnWrapper}>
              <Button
                href={`/community/jobs?type=${post?.jobType?.toLowerCase() || "hiring"}`}
                variant="edit"
              >
                목록으로
              </Button>
            </div>
          </footer>
        </article>
      </div>
    </>
  );
}
