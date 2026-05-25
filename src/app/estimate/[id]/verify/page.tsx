"use client";

import { useState } from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

interface Props {
  params: {
    id: string;
  };
}

export default function EstimateVerifyPage({ params }: Props) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`/api/estimate/${params.id}/verify`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast(data.message || "비밀번호가 일치하지 않습니다.");

        return;
      }

      router.push(`/estimate/${params.id}`);
      router.refresh();
    } catch (error) {
      console.error(error);

      toast("인증 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>비밀번호 확인</h1>

          <p>
            비회원 문의글입니다.
            <br />
            작성 시 입력한 비밀번호를 입력해주세요.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>비밀번호</label>

            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.bottomButtons}>
            <Link href="/estimate" className={styles.listButton}>
              목록으로
            </Link>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "확인 중..." : "확인"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
