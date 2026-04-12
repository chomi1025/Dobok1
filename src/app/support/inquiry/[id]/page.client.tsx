"use client";
import styles from "./page.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/common/buttons/page";
import { customConfirm } from "@/lib/swal";
import DetailLayout from "@/components/common/DetailLayout/page";
import { FiLock } from "react-icons/fi";

interface InquiryReply {
  id: number;
  content: string;
  createdAt: Date;
}

interface inquiryType {
  id: number;
  userId: number;
  category: string;
  title: string;
  content: string;
  createdAt: Date;
  replies: InquiryReply[];
}

interface Props {
  inquiry?: inquiryType;
  currentUserId: number;
  isAdmin: boolean;
  isLocked?: boolean;
}

export default function InquiryClientPage({
  inquiry,
  currentUserId,
  isAdmin,
  isLocked,
}: Props) {
  const router = useRouter();
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (isLocked) {
    return (
      <div className={styles.privateWrapper}>
        <div className={styles.privateContent}>
          <FiLock className={styles.lockIcon} />
          <h2>비밀글입니다.</h2>
          <p>작성자 본인과 관리자만 확인 가능합니다.</p>
          <Button variant="list" href="/support/inquiry">
            목록으로
          </Button>
        </div>
      </div>
    );
  }

  if (!inquiry) return <div>데이터를 불러올 수 없습니다.</div>;

  const hasReply = inquiry.replies?.length > 0;

  const handleDelete = async () => {
    const result = await customConfirm({
      title: "이 문의글을 삭제하시겠습니까?",
      confirmText: "삭제",
      isDanger: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/inquiry/${inquiry.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("게시글이 삭제되었습니다.");

          router.push("/support/inquiry");
          router.refresh();
        } else {
          toast.error("삭제 중 오류가 발생했습니다.");
        }
      } catch (err) {
        toast.error("통신 오류가 발생했습니다.");
      }
    }
  };

  // 관리자 답변 함수(등록+수정)
  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return alert("답변 내용을 입력해주세요.");

    setIsSubmitting(true);

    const method = hasReply ? "PATCH" : "POST";

    try {
      const response = await fetch(`/api/inquiry/${inquiry.id}/reply`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: replyContent }),
      });

      if (response.ok) {
        toast.success(
          hasReply ? "답변이 수정되었습니다." : "답변이 등록되었습니다.",
        );

        setIsEditing(false);
        router.refresh();
      } else {
        const errorData = await response.json();
        alert(errorData.message || "등록에 실패했습니다.");
      }
    } catch (err) {
      toast.error("오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReply = async () => {
    const result = await customConfirm({
      title: "이 문의 답변을 삭제하시겠습니까?",
      confirmText: "삭제",
      isDanger: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`/api/inquiry/${inquiry.id}/reply`, {
          method: "DELETE",
        });

        if (response.ok) {
          setReplyContent("");
          toast.success("답변이 삭제되었습니다.");
          router.refresh();
        } else {
          toast.error("삭제에 실패했습니다.");
        }
      } catch (err) {
        toast.error("오류가 발생했습니다.");
      }
    }
  };

  return (
    <DetailLayout
      pageTitle="1:1문의사항"
      title={inquiry.title}
      date={new Date(inquiry.createdAt).toLocaleDateString()}
      backLink="/support/inquiry"
      isAdmin={isAdmin}
      isAuthor={inquiry.userId === currentUserId}
      editLink={`/support/inquiry/edit/${inquiry.id}`}
      onDelete={handleDelete}
    >
      <div className={styles.content}>{inquiry.content}</div>

      {/* 💗💗💗💗💗 답변 쪽 💗💗💗💗💗💗 */}
      <div className={styles.replySection}>
        {hasReply ? (
          inquiry.replies?.map((reply: InquiryReply) => (
            <div key={reply.id}>
              {!isEditing ? (
                <div className={styles.replyBox}>
                  <div className={styles.replyHeader}>
                    <span className={styles.replyDate}>
                      <strong>관리자 답변</strong>

                      {new Date(reply.createdAt).toLocaleDateString()}
                    </span>

                    <div className={styles.sideGroup}>
                      {isAdmin && (
                        <div className={styles.replyActions}>
                          <Button
                            variant="edit"
                            onClick={() => {
                              setIsEditing(true);
                              setReplyContent(reply.content);
                            }}
                          >
                            {"수정"}
                          </Button>

                          <Button
                            variant="delete"
                            className={styles.replyDeleteBtn}
                            onClick={() => {
                              handleDeleteReply();
                            }}
                          >
                            {"삭제"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.replyContent}>{reply.content}</div>
                </div>
              ) : (
                <div className={`${styles.adminReplyForm} ${styles.editMode}`}>
                  <div className={styles.formHeader}>
                    <h3>관리자 답변 수정</h3>
                  </div>

                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="수정할 내용을 입력해주세요."
                    rows={6}
                  />
                  <div className={styles.formFooter}>
                    <button
                      className={styles.closeBtn}
                      onClick={() => setIsEditing(false)}
                    >
                      취소
                    </button>
                    <button
                      onClick={handleReplySubmit}
                      disabled={isSubmitting}
                      className={styles.submitBtn}
                    >
                      {isSubmitting ? "수정 중..." : "수정"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <>
            {!isAdmin ? (
              <div className={styles.noReply}>
                <p>담당자가 문의 내용을 확인 중입니다. 잠시만 기다려 주세요.</p>
              </div>
            ) : (
              <div className={styles.adminReplyForm}>
                <h3>관리자 답변 작성</h3>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="고객님께 남길 답변을 입력해주세요."
                  rows={6}
                />
                <div className={styles.formFooter}>
                  <button
                    onClick={handleReplySubmit}
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                  >
                    {isSubmitting ? "등록 중..." : " 등록"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DetailLayout>
  );
}
