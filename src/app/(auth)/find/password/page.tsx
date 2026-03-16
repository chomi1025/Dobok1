"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import toast from "react-hot-toast";

export default function FindPasswordPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name)
      return toast.error("이름과 이메일을 모두 입력해주세요.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/find-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        setIsSent(true);
        toast.success("비밀번호 재설정 메일을 보냈습니다. 📧");
      } else {
        const data = await res.json();
        toast.error(data.message || "정보를 찾을 수 없습니다.");
      }
    } catch (error) {
      toast.error("서버 에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {!isSent ? (
        <FormBox onSubmit={handleSubmit}>
          <h3>비밀번호 재설정</h3>
          <p>
            가입할 때 입력한 이름과 이메일을 입력하면
            <br />
            비밀번호 변경 링크를 보내드립니다.
          </p>

          <Input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <SubmitBtn type="submit" disabled={loading}>
            {loading ? "발송 중..." : "재설정 메일 받기"}
          </SubmitBtn>
        </FormBox>
      ) : (
        <SuccessBox>
          <div className="icon">📧</div>
          <h4>메일 발송 완료!</h4>
          <p>
            <strong>{email}</strong> 메일함을 확인해주세요.
            <br />
            링크는 1시간 동안만 유효합니다.
          </p>
          <button onClick={() => setIsSent(false)}>다시 시도하기</button>
        </SuccessBox>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
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
    line-height: 1.5;
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
const SuccessBox = styled.div`
  text-align: center;
  padding: 40px 20px;
  .icon {
    font-size: 50px;
    margin-bottom: 20px;
  }
  h4 {
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
  }
  button {
    background: none;
    border: none;
    color: #999;
    text-decoration: underline;
    cursor: pointer;
  }
`;
