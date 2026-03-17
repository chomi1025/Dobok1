"use client";

import { useState } from "react";
import styled from "@emotion/styled";
import toast from "react-hot-toast";

export default function FindIdPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ name: "", email: "" });
  const [authCode, setAuthCode] = useState("");
  const [resultId, setResultId] = useState("");

  const sendCode = async () => {
    if (!info.name || !info.email)
      return toast.error("이름과 이메일을 입력해줘!");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/find-id", {
        method: "POST",
        body: JSON.stringify(info),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("인증번호가 발송되었습니다. 메일함을 확인해주세요.");
        setStep(2);
      } else {
        toast.error(data.message || "정보가 일치하지 않아.");
      }
    } catch (err) {
      toast.error("서버 에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!authCode) return toast.error("인증번호를 입력해주세요.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/find-id/verify", {
        method: "POST",
        body: JSON.stringify({ email: info.email, code: authCode }),
      });
      const data = await res.json();

      if (res.ok) {
        setResultId(data.maskedId);
        setStep(3);
      } else {
        toast.error("인증번호가 틀렸습니다. 다시 한번 확인해주세요.");
      }
    } catch (err) {
      toast.error("검증 중 에러가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {step === 1 && (
        <FormBox>
          <p>
            등록된 이름과 이메일을 입력하면
            <br />
            메일로 인증번호가 전송됩니다.
          </p>
          <input
            type="text"
            placeholder="이름 입력"
            value={info.name}
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="이메일 입력"
            value={info.email}
            onChange={(e) => setInfo({ ...info, email: e.target.value })}
          />
          <SubmitBtn onClick={sendCode} disabled={loading}>
            {loading ? "발송 중..." : "인증번호 받기"}
          </SubmitBtn>
        </FormBox>
      )}

      {step === 2 && (
        <FormBox>
          <p>
            <strong>{info.email}</strong>로<br />
            보낸 인증번호 6자리를 입력해주세요.
          </p>
          <input
            type="text"
            placeholder="인증번호 입력"
            value={authCode}
            maxLength={6}
            onChange={(e) => setAuthCode(e.target.value)}
          />
          <SubmitBtn onClick={verifyCode} disabled={loading}>
            {loading ? "확인 중..." : "아이디 찾기"}
          </SubmitBtn>
          <button className="resend" onClick={() => setStep(1)}>
            다시 입력하기
          </button>
        </FormBox>
      )}

      {step === 3 && (
        <ResultBox>
          <p>찾으시는 아이디는 다음과 같습니다.</p>
          <div className="id-card">
            <strong>{resultId}</strong>
          </div>
          <LoginBtn href="/login">로그인하러 가기</LoginBtn>
        </ResultBox>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  p {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 10px;
    color: #666;
  }
  input {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .resend {
    background: none;
    border: none;
    font-size: 12px;
    color: #999;
    text-decoration: underline;
    cursor: pointer;
  }
`;
const SubmitBtn = styled.button`
  padding: 14px;
  background: #222;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  &:disabled {
    background: #ccc;
  }
`;

const ResultBox = styled.div`
  text-align: center;

  p {
    font-size: 15px;
  }

  .id-card {
    margin: 20px 0;
    padding: 30px;
    background: #f8f8f8;
    border-radius: 8px;
    font-size: 20px;
  }
`;

const LoginBtn = styled.a`
  display: block;
  padding: 14px;
  background: #222;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
`;
