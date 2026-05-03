"use client";
import styles from "./page.module.scss";
import Button from "@/components/common/buttons/page";
import Link from "next/link";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { customConfirm } from "@/lib/swal";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

type CommentWithAuthor = {
  id: number;
  content: string;
  createdAt: Date | string;
  authorId: string;
  author: {
    nickname: string | null;
  };
};

type PostWithAuthor = Post & {
  author: {
    nickname: string | null;
  };
  comments: CommentWithAuthor[];
};

interface Props {
  post: PostWithAuthor;
}

export default function PostDetailClientPage({ post: initialPost }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: post } = useQuery({
    queryKey: ["post", initialPost.id],
    queryFn: () =>
      fetch(`/api/community/free/${initialPost.id}`).then((res) => res.json()),
    initialData: initialPost,
    staleTime: 1000 * 60,
  });

  const { data: session } = useSession();
  const isOwner = session?.user?.id === String(post.authorId);
  const isAdmin = session?.user?.role === "ADMIN";

  const [commentContent, setCommentContent] = useState("");

  const [cleanHtml, setCleanHtml] = useState("");

  //   정화
  useEffect(() => {
    const sanitized = DOMPurify.sanitize(post.content);
    setCleanHtml(sanitized);
  }, [post.content]);

  //   조회수 증가
  useEffect(() => {
    if (!post.id) return;

    const category = "free";
    const viewedKey = `viewed_post_${post.id}`;
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
  }, [post.id]);

  const formattedDate = format(new Date(post.createdAt), "PPP p", {
    locale: ko,
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/community/free/${initialPost.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("삭제 실패");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "FREE"] });

      toast.success("게시글이 삭제되었습니다.");

      router.push("/community/free");
      router.refresh();
    },
    onError: () => {
      alert("삭제 중 오류가 발생했습니다.");
    },
  });

  const handleDelete = async () => {
    const result = await customConfirm({
      title: "정말 삭제하시겠습니까?",
      text: "삭제된 게시글은 복구할 수 없습니다.",
      confirmText: "삭제",
      cancelText: "취소",
      isDanger: true,
    });

    if (result.isConfirmed) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <header>
          <h1>자유게시판</h1>
        </header>

        <article>
          <header className={styles.header}>
            <h2 className={styles.title}>{post.title}</h2>
            <div className={styles.meta}>
              <span>{post.authorNickname ?? "익명"}</span>
              <span>{formattedDate}</span>
              <span>조회 {post.viewCount}</span>
            </div>

            <div className={styles.rightBtns}>
              {isOwner && (
                <Button
                  variant="edit"
                  href={`community/free/${initialPost.id}/edit`}
                >
                  수정
                </Button>
              )}

              {(isOwner || isAdmin) && (
                <Button variant="delete" onClick={handleDelete}>
                  삭제
                </Button>
              )}
            </div>
          </header>

          <section
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
        </article>

        <hr className={styles.divider} />

        {/* 댓글 섹션 */}
        <section className={styles.commentsSection}>
          <h3>댓글 {post.comments?.length ?? 0}</h3>

          <div className={styles.commentInputWrapper}>
            <textarea
              placeholder="댓글을 남겨보세요"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <div className={styles.submitBtn}>
              <Button variant="primary">등록</Button>
            </div>
          </div>

          <div className={styles.commentList}>
            {post.comments.map((comment: CommentWithAuthor) => (
              <div key={comment.id} className={styles.commentItem}>
                <div className={styles.commentMeta}>
                  <span className={styles.author}>
                    {comment.author.nickname ?? "익명"}
                  </span>
                  <span className={styles.date}>
                    {format(new Date(comment.createdAt), "yyyy.MM.dd HH:mm")}
                  </span>
                </div>
                <p className={styles.commentBody}>{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <div className={styles.leftBtns}>
          <Button href="/community/free" variant="outline">
            목록으로
          </Button>
        </div>
      </footer>
    </div>
  );
}
