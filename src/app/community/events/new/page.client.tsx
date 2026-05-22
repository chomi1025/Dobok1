"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./page.module.scss";
import Button from "@/components/common/buttons/page";
import Editor from "@/components/common/editor/page";
import toast from "react-hot-toast";
import { CITY_OPTIONS, DISTRICTS } from "@/constants/regions";
import { Session } from "next-auth";

interface Props {
  session: Session;
}

export default function EventsClientPage({ session }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("COMPETITION");
  const [eventDate, setEventDate] = useState("");
  const [city, setCity] = useState("SEOUL"); //지역
  const [district, setDistrict] = useState("");
  const [eventVenue, setEventVenue] = useState(""); //행사장ㅅ

  const isSubmitting = useRef(false);

  const mutation = useMutation({
    mutationFn: async (newPost: {
      title: string;
      content: string;
      category: string;
      eventDate: string;
      city: string;
      district: string;
      eventVenue?: string;

      authorNickname: string;
    }) => {
      const res = await fetch("/api/community/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) {
        throw new Error("등록 실패");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "EVENT"] });
      toast.success("글이 등록되었습니다!");

      router.push("/community/events");
      router.refresh();
    },
    onError: (error) => {
      toast.error("등록 중 오류가 발생했습니다.");
      isSubmitting.current = false;
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }

    if (!content.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    if (!eventDate) {
      toast.error("개최일을 선택해주세요.");
      return;
    }

    if (!city) {
      toast.error("지역을 선택해주세요.");
      return;
    }

    if (!district) {
      toast.error("시/군/구를 선택해주세요.");
      return;
    }

    if (isSubmitting.current) return;

    isSubmitting.current = true;

    mutation.mutate({
      title,
      content,
      category,
      eventDate,
      city,
      district,
      eventVenue,
      authorNickname: session.user.nickname ?? "익명",
    });
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>대회·행사정보 글쓰기</h1>
      </header>

      <hr />

      <div className={styles.form}>
        <div className={styles.row}>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.select}
          >
            <option value="COMPETITION">대회</option>
            <option value="SEMINAR">세미나</option>
            <option value="EVENT">행사</option>
            <option value="NOTICE">공지</option>
          </select>

          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className={styles.input}
          />

          <div className={styles.row}>
            <select
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setDistrict("");
              }}
              className={styles.select}
            >
              {CITY_OPTIONS.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>

            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className={styles.select}
            >
              <option value="">시/군/구 선택</option>

              {DISTRICTS[city]?.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        <input
          type="text"
          placeholder="행사 장소를 입력하세요 (예: 국기원)"
          value={eventVenue}
          onChange={(e) => setEventVenue(e.target.value)}
          className={styles.titleInput}
        />

        <input
          className={styles.titleInput}
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Editor value={content} onChange={setContent} />

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
