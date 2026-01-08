"use client";
import * as L from "./style";
import Link from "next/link";

export default function Login() {
  return (
    <L.Inner>
      <L.Title_Wrapper>
        <h2>로그인</h2>
        <p>도복일번지에 가입하시고 다양한 혜택을 받아보세요! </p>
      </L.Title_Wrapper>

      <L.Line></L.Line>

      <L.Form>
        <L.Field>
          <div>
            <label htmlFor="userId">아이디</label>
            <L.Input
              id="userId"
              type="text"
              name="userId"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label htmlFor="password">비밀번호</label>
            <L.Input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
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

          <button type="submit">로그인</button>
          <L.LinkButton href="/signup">회원가입</L.LinkButton>
        </L.Field>
      </L.Form>
    </L.Inner>
  );
}
