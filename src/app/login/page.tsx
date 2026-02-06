"use client";
import { useRouter } from "next/navigation";
import * as L from "./style";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react"; // ✅ 여기 import 필수

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
        console.log("로그인 실패: " + res?.error);
        router.refresh();
        return;
      }

      alert("로그인 성공");
      router.push("/");
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

      <L.Line></L.Line>

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
              <Link href="/">아이디 찾기</Link>
            </li>
            <li>
              <Link href="/">비밀번호 찾기</Link>
            </li>
          </ul>

          <button type="submit">{loading ? "로그인 중..." : "로그인"}</button>
          <L.LinkButton href="/signup">회원가입</L.LinkButton>
        </L.Field>
      </L.Form>
    </L.Inner>
  );
}
