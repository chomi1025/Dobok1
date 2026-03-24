"use client";
import { useRouter } from "next/navigation";
import * as L from "./style";
import Link from "next/link";
import { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: id,
        password,
      });

      setLoading(false);

      if (!res?.ok) {
        toast.error("아이디나 비밀번호를 다시 확인해주세요");

        return;
      }

      const session = await getSession();
      const userName = session?.user?.name || id;

      router.refresh();

      router.push("/");

      toast.success(`${userName}님, 반가워요! 🥋`, {
        duration: 2000,
      });
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("로그인 중 오류 발생");
    }
  };

  return (
    <L.Inner>
      <L.Title_Wrapper>
        <h2>로그인</h2>
        <p>도복일번지에 가입하시고 다양한 혜택을 받아보세요! </p>
      </L.Title_Wrapper>

      <L.Line />

      <L.Form onSubmit={handleSubmit}>
        <L.Field>
          <div>
            <label htmlFor="userId">아이디</label>
            <L.Input
              placeholder="아이디"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">비밀번호</label>
            <L.Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <ul>
            <li>
              <Link href="/find/id">아이디 찾기</Link>
            </li>
            <li>
              <Link href="/find/password">비밀번호 찾기</Link>
            </li>
          </ul>

          <button type="submit">{loading ? "로그인 중..." : "로그인"}</button>
          <L.LinkButton href="/signup/step1">회원가입</L.LinkButton>
        </L.Field>
      </L.Form>
    </L.Inner>
  );
}
