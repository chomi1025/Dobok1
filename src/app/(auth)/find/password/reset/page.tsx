"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styled from "@emotion/styled";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return toast.error("유효하지 않은 접근입니다.");
    if (password !== confirmPassword)
      return toast.error("비밀번호가 일치하지 않습니다.");
    if (password.length < 8)
      return toast.error("비밀번호는 8자 이상으로 입력해주세요.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/find-password/reset", {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });

      if (res.ok) {
        toast.success("비밀번호 변경 완료.다시 로그인해주세요 ");
        router.push("/login");
      } else {
        const data = await res.json();
        toast.error(data.message || "변경에 실패했습니다.");
      }
    } catch (err) {
      toast.error("서버 에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormBox onSubmit={handleReset}>
        <h3>새 비밀번호 설정</h3>
        <p>새로운 비밀번호를 입력해주세요. </p>

        <Input
          type="password"
          placeholder="새 비밀번호 (8자 이상)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <SubmitBtn type="submit" disabled={loading || !token}>
          {loading ? "변경 중..." : "비밀번호 변경하기"}
        </SubmitBtn>
      </FormBox>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  max-width: 400px;
  margin: 100px auto;
`;
const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  h3 {
    margin-bottom: 5px;
  }
  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }
`;
const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;
const SubmitBtn = styled.button`
  padding: 14px;
  background: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  &:disabled {
    background: #ccc;
  }
`;
