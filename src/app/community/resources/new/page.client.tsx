"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./page.module.scss";
import Button from "@/components/common/buttons/page";
import Editor from "@/components/common/editor/page";
import toast from "react-hot-toast";
import { Session } from "next-auth";

interface Props {
  session: Session;
}

type Attachment = {
  fileName: string;
  fileUrl: string;
  publicId: string;
  fileType: string;
  fileSize: number;
};

export default function ResourcesNewClientPage({ session }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const isSubmitting = useRef(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [category, setCategory] = useState("DOCUMENT");
  const [videoUrl, setVideoUrl] = useState("");
  const [externalUrl, setExternalUrl] = useState("");

  // 👇 핵심: 업로드된 파일 결과 저장
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const mutation = useMutation({
    mutationFn: async (newPost: FormData) => {
      const res = await fetch("/api/community/resources", {
        method: "POST",
        body: newPost,
      });

      if (!res.ok) {
        throw new Error("등록 실패");
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", "RESOURCE"],
      });

      toast.success("자료가 등록되었습니다!");

      router.push("/community/resources");
      router.refresh();
    },

    onError: () => {
      toast.error("등록 중 오류가 발생했습니다.");
      isSubmitting.current = false;
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    const uploaded = await Promise.all(
      selectedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) throw new Error("upload fail");

        return res.json();
      }),
    );

    setAttachments((prev) => [...prev, ...uploaded]);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    if (isSubmitting.current) return;

    isSubmitting.current = true;

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("videoUrl", videoUrl);
      formData.append("externalUrl", externalUrl);
      formData.append("authorNickname", session.user.nickname ?? "익명");

      // 🔥 핵심: attachments JSON으로 전달
      formData.append("attachments", JSON.stringify(attachments));

      await mutation.mutateAsync(formData);
    } catch (err) {
      isSubmitting.current = false;
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>도장 운영 자료실 글쓰기</h1>
        <p>운영 문서, 수련 자료, 공지사항 등을 공유해보세요.</p>
      </header>

      <hr />

      <div className={styles.form}>
        {/* 카테고리 */}
        <div className={styles.row}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.select}
          >
            <option value="DOCUMENT">운영자료</option>
            <option value="EDUCATION">교육자료</option>
            <option value="MEDIA">영상자료</option>
            <option value="ETC">기타</option>
          </select>
        </div>

        {/* 제목 */}
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.titleInput}
        />

        {/* 에디터 */}
        <Editor value={content} onChange={setContent} />

        {/* 링크 */}
        <input
          type="text"
          placeholder="유튜브 링크"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className={styles.input}
        />

        <input
          type="text"
          placeholder="외부 링크"
          value={externalUrl}
          onChange={(e) => setExternalUrl(e.target.value)}
          className={styles.input}
        />

        {/* 파일 */}
        <div className={styles.fileUpload}>
          <label htmlFor="file">파일 첨부</label>

          <input id="file" type="file" multiple onChange={handleFileChange} />

          {attachments.length > 0 && (
            <ul className={styles.fileList}>
              {attachments.map((file, idx) => (
                <li key={idx}>{file.fileName}</li>
              ))}
            </ul>
          )}
        </div>

        {/* 버튼 */}
        <div className={styles.actions}>
          <Button variant="outline" onClick={() => router.back()}>
            취소
          </Button>

          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={mutation.isPending || isSubmitting.current}
          >
            {mutation.isPending ? "등록 중..." : "등록"}
          </Button>
        </div>
      </div>
    </div>
  );
}
