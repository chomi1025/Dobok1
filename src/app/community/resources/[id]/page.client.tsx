"use client";

import styles from "./page.module.scss";
import Button from "@/components/common/buttons/page";
import { Post } from "@prisma/client";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { customConfirm } from "@/lib/swal";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

type CommentWithAuthor = {
  id: number;
  content: string;
  createdAt: Date | string;
  author: {
    nickname: string | null;
  };
};

export type Attachment = {
  id: number;

  fileName: string;
  fileUrl: string;

  publicId: string;
  fileType: string;
  fileSize: number;

  postId: number;

  createdAt: Date | string;
};

export type Comment = {
  id: number;

  content: string;

  createdAt: Date | string;

  postId: number;

  authorId: number;

  author: {
    nickname: string | null;
  };
};

type PostWithAuthor = Post & {
  author: {
    nickname: string | null;
  };
  comments: CommentWithAuthor[];
  attachments: Attachment[];
};

interface Props {
  post: PostWithAuthor;
}

export default function ResourceDetailClientPage({ post: initialPost }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const { data: post } = useQuery({
    queryKey: ["resource", initialPost.id],
    queryFn: () =>
      fetch(`/api/community/resources/${initialPost.id}`).then((res) =>
        res.json(),
      ),
    initialData: initialPost,
    staleTime: 1000 * 60,
  });

  const isOwner =
    session?.user?.id &&
    post?.authorId &&
    session.user.id === String(post.authorId);

  const isAdmin = session?.user?.role === "ADMIN";

  const [commentContent, setCommentContent] = useState("");
  const [cleanHtml, setCleanHtml] = useState("");

  // ✅ HTML sanitize
  useEffect(() => {
    if (!post?.content) return;
    setCleanHtml(DOMPurify.sanitize(post.content));
  }, [post?.content]);

  const formattedDate = format(new Date(post.createdAt), "PPP p", {
    locale: ko,
  });

  // ✅ DELETE
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/community/resources/${initialPost.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("삭제 실패");
      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", "RESOURCE"],
      });

      toast.success("게시글이 삭제되었습니다.");
      router.push("/community/resources");
      router.refresh();
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

  if (!post) return null;

  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <header>
          <h1>도장 운영 자료실</h1>
        </header>

        <article>
          <header className={styles.header}>
            <h2 className={styles.title}>{post.title}</h2>

            <div className={styles.meta}>
              <span>{post.authorNickname ?? "익명"}</span>
              <span>작성일 : {formattedDate}</span>
              <span>조회 {post.viewCount}</span>
            </div>

            <div className={styles.rightBtns}>
              {isOwner && (
                <Button
                  variant="edit"
                  href={`/community/resources/${initialPost.id}/edit`}
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

          {/* 내용 */}
          <section
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />

          {post.attachments?.length > 0 && (
            <div className={styles.attachments}>
              <h3>첨부파일</h3>

              <ul>
                {post.attachments.map((file: Attachment) => (
                  <li key={file.id}>
                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📎 {file.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </article>

        <hr className={styles.divider} />

        {/* 댓글 */}
        <section className={styles.commentsSection}>
          <h3>댓글 {post.comments?.length ?? 0}</h3>

          <textarea
            placeholder="댓글을 남겨보세요"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />

          <Button variant="primary">등록</Button>

          <div className={styles.commentList}>
            {post.comments?.map((comment: Comment) => (
              <div key={comment.id} className={styles.commentItem}>
                <div className={styles.commentMeta}>
                  <span>{comment.author.nickname ?? "익명"}</span>
                  <span>
                    {format(new Date(comment.createdAt), "yyyy.MM.dd HH:mm")}
                  </span>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <Button href="/community/resources" variant="outline">
          목록으로
        </Button>
      </footer>
    </div>
  );
}
