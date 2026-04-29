"use client";
import styles from "./page.module.scss";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import { useEffect, useState, useRef } from "react";
import { CITY_OPTIONS } from "@/constants/regions";
import Button from "@/components/common/buttons/page";
import { EXPERIENCE_MAP, JOB_ROLE_MAP } from "@/constants/jobs";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customConfirm } from "@/lib/swal";

export default function JobsDetailClientPage({ postId }: { postId: number }) {
  const { data: session } = useSession();
  const router = useRouter();

  const { data: post, isLoading: isPostLoading } = useQuery({
    queryKey: ["jobs", postId],
    queryFn: async () => {
      const res = await fetch(`/api/community/jobs/${postId}`);
      if (!res.ok) throw new Error("게시글을 찾을 수 없습니다.");
      return res.json();
    },
  });

  const [userMenuAnchor, setUserMenuAnchor] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [sanitizedHtml, setSanitizedHtml] = useState("");
  const queryClient = useQueryClient();

  const isSubmitting = useRef(false);

  // 정화
  useEffect(() => {
    if (post?.content) {
      setSanitizedHtml(DOMPurify.sanitize(post.content));
    }
  }, [post?.content]);

  if (isPostLoading) return <div>로딩 중...</div>;
  if (!post) return <div>게시글이 존재하지 않습니다.</div>;

  const isAuthor = Number(session?.user?.id) === post?.authorId;
  const isAdmin = session?.user?.role === "ADMIN";

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/community/jobs/${postId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "삭제 실패");
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success("게시글이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      router.push("/community/jobs");
      router.refresh();
    },
    onError: (error: any) => {
      toast.error(error.message || "삭제에 실패했습니다.");
    },
  });

  const handleDelete = async () => {
    if (isSubmitting.current) return;

    const result = await customConfirm({
      title: "정말 삭제하시겠습니까?",
      text: "구인/구직 게시글은 삭제 후 \n복구가 불가능합니다.",
      confirmText: "삭제하기",
      isDanger: true,
    });

    if (result.isConfirmed) {
      isSubmitting.current = true;
      deleteMutation.mutate();
    }
  };

  const handleRevealContact = async () => {
    if (!session) {
      toast.error("로그인이 필요한 서비스입니다.");
      return;
    }
    try {
      setIsContactLoading(true);
      const res = await fetch(
        `/api/user/${post.authorId}/contact?postId=${post.id}`,
      );
      if (!res.ok) throw new Error();
      setShowContact(true);
    } catch (error) {
      toast.error("정보를 불러오지 못했습니다.");
    } finally {
      setIsContactLoading(false);
    }
  };

  const handleNicknameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();

    setUserMenuAnchor({
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 5,
    });
  };

  useEffect(() => {
    const handleOutsideClick = () => setUserMenuAnchor(null);
    if (userMenuAnchor) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [userMenuAnchor]);

  useEffect(() => {
    if (!post?.id) return;

    const category = "job";
    const viewedKey = `viewed_${category}_${post.id}`;
    const isViewed = sessionStorage.getItem(viewedKey);

    if (isViewed) return;

    const updateViewCount = async () => {
      try {
        await fetch(`/api/community/${category}/${post.id}/view`, {
          method: "POST",
        });
        sessionStorage.setItem(viewedKey, "true");
      } catch (error) {
        console.error("Failed to update view count:", error);
      }
    };

    updateViewCount();
  }, [post?.id]);

  const getApplyMethods = (methods: string) => {
    if (!methods) return "전화문의";
    return methods
      .split(",")
      .map((m) => {
        if (m === "PHONE") return "전화";
        if (m === "MESSAGE") return "도복일번지 쪽지";
        if (m === "EMAIL") return "이메일";
        return m;
      })
      .join(", ");
  };

  if (isPostLoading) return <div>로딩 중...</div>;
  if (!post) return <div>게시글이 존재하지 않습니다.</div>;

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
                  disabled={deleteMutation.isPending || isSubmitting.current}
                >
                  {deleteMutation.isPending ? "삭제 중..." : "삭제"}
                </Button>
              </>
            ) : (
              isAdmin && (
                <Button
                  variant="delete"
                  className={styles.deleteBtn}
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending || isSubmitting.current}
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
              <li className={styles.nicknameWrapper}>
                <span className={styles.nickname} onClick={handleNicknameClick}>
                  {post.jobType === "SEEKING"
                    ? post?.author.nickname || "익명"
                    : post?.companyName || "업체명 미기재"}
                </span>

                {userMenuAnchor && (
                  <div
                    className={styles.userPopOver}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        router.push(`/messages/send?to=${post.authorId}`)
                      }
                    >
                      ✉️ 쪽지 보내기
                    </button>
                    <button
                      onClick={() => router.push(`/profile/${post.authorId}`)}
                    >
                      👤 작성글 보기
                    </button>
                  </div>
                )}
              </li>
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
              <h3 className={styles.applyTitle}>
                {post.jobType === "SEEKING" ? "문의하기" : "지원 방법"}
              </h3>
              <div className={styles.applyContent}>
                <p className={styles.applyMethods}>
                  방법: <strong>{getApplyMethods(post?.applyMethod)}</strong>
                </p>

                <div className={styles.contactInfo}>
                  {showContact ? (
                    <div className={styles.realContact}>
                      {post?.applyMethod.includes("PHONE") && (
                        <span>📞 {post.author.phone}</span>
                      )}
                      {post?.applyMethod.includes("EMAIL") && (
                        <span>✉️ {post.author.email}</span>
                      )}
                    </div>
                  ) : (
                    <button
                      className={styles.revealBtn}
                      onClick={handleRevealContact}
                    >
                      연락처 보기
                    </button>
                  )}
                </div>
              </div>

              <div className={styles.legalNotice}>
                <div className={styles.legalHeader}>
                  <span className={styles.warnIcon}>⚠️</span>
                  <h4>개인정보 보호 및 부당 이용 금지 고지</h4>
                </div>

                <div className={styles.legalBody}>
                  <p className={styles.mainLaw}>
                    본 게시판을 통해 취득한 개인정보(연락처 등)를
                    <strong> 채용 목적 외</strong>로 이용하거나 제3자에게 제공,
                    공개하는 행위는 엄격히 금지됩니다.
                  </p>

                  <ul>
                    <li>
                      <strong>개인정보 보호법 제18조:</strong> 개인정보를 범위를
                      초과하여 이용하거나 제3자에게 제공할 경우
                      <strong> 5년 이하의 징역 또는 5천만원 이하의 벌금</strong>
                      에 처해질 수 있습니다.
                    </li>
                    <li>
                      <strong>정보통신망법 제50조:</strong> 수신자의 사전 동의
                      없는 광고성 정보(스팸, 피싱) 전송은 금지되며, 이를 위반할
                      경우 <strong>3천만원 이하의 과태료</strong>가 부과됩니다.
                    </li>
                    <li>
                      본 사이트는 스팸 및 피싱 방지를 위해
                      <strong>연락처 조회 이력을 기록</strong>하고 있으며, 피해
                      발생 시 관련 기관(경찰청, KISA)에 수사 자료로 제공될 수
                      있음을 알려드립니다.
                    </li>
                  </ul>
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
