"use client";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";
import styles from "./page.module.scss";
import Link from "next/link";

export default function LoginClientPage() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isSubmitting = useRef(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting.current) return;
    isSubmitting.current = true;

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: id,
        password,
      });

      if (!res?.ok) {
        toast.error("아이디나 비밀번호를 다시 확인해주세요");
        setLoading(false);
        isSubmitting.current = false;

        return;
      }

      const session = await getSession();
      const userName = session?.user?.name || id;

      toast.success(`${userName}님, 반가워요!`, {
        duration: 2000,
      });

      router.refresh();

      router.push("/");
    } catch (err) {
      toast("로그인 중 오류가 발생했습니다.");
      setLoading(false);
      isSubmitting.current = false;
    }
  };

  return (
    <div className={styles.inner}>
      <header className={styles.titleArea}>
        <h2>로그인</h2>
        <p>도복일번지에 가입하시고 다양한 혜택을 받아보세요! </p>
      </header>

      <hr className={styles.line} />

      <form className={styles.formArea} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <div>
            <label htmlFor="userId">아이디</label>

            <input
              className={styles.input}
              placeholder="아이디"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">비밀번호</label>

            <input
              className={styles.input}
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <ul>
            <li>
              <Link href="/find/id" prefetch={false}>
                아이디 찾기
              </Link>
            </li>

            <li>
              <Link href="/find/password" prefetch={false}>
                비밀번호 찾기
              </Link>
            </li>
          </ul>

          <button
            type="submit"
            disabled={loading}
            className={loading ? styles.disabledBtn : ""}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>

          <Link href="/signup/step1" prefetch={false}>
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}
