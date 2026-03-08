"use client";
import * as S from "./style";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useEffect, useState } from "react";
import { FormType } from "./types";

type User = {
  id: string;
  username: string;
};

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  setValue?: UseFormSetValue<T>; // 선택사항으로 변경 (수정페이지에선 안 쓸 수도 있으니)
  clearErrors?: UseFormClearErrors<T>;
  isEdit: boolean;
  user?: { id: string; username: string };
};

export default function AccountComponent<T extends FieldValues>({
  register,
  errors,
  setValue,
  clearErrors,
  isEdit,
  user,
}: Props<T>) {
  const [checkMessage, setCheckMessage] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleCheckUsername = async () => {
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;

    if (!username) {
      setCheckMessage("아이디를 입력해주세요!");
      return;
    }

    // ✅ 프론트에서 yup 검증
    const usernameRegex = /^[A-Za-z0-9]+$/; // 영어+숫자만
    if (!usernameRegex.test(username)) {
      setCheckMessage("아이디는 영어와 숫자만 사용 가능합니다.");
      return;
    }

    setIsChecking(true);
    setCheckMessage(null);

    try {
      // 서버 API 호출 (예: /api/check-username?username=...)
      const res = await fetch(`/api/check-username?username=${username}`);
      const data = await res.json();

      if (data.exists) {
        setCheckMessage("❌ 이미 사용 중인 아이디 입니다.");
        setValue?.("usernameChecked" as Path<T>, false as any);
      } else {
        setCheckMessage("✅ 사용 가능한 아이디 입니다!");
        setValue?.("usernameChecked" as Path<T>, true as any, {
          shouldValidate: true,
        });
        clearErrors?.("usernameChecked" as Path<T>);
      }
    } catch (error) {
      console.error(error);
      setCheckMessage("⚠️ 서버 오류가 발생했습니다.");
    } finally {
      setIsChecking(false);
    }
  };

  // ✅ checkMessage가 바뀌면 3초 후 자동 사라지게
  useEffect(() => {
    if (checkMessage) {
      // 3초 후 fadeOut 시작
      const timer1 = setTimeout(() => setFadeOut(true), 2000);
      // fadeOut 끝나면 DOM 제거
      const timer2 = setTimeout(() => {
        setCheckMessage(null);
        setFadeOut(false);
      }, 3500); // transition duration(0.5s) 후 제거

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [checkMessage]);

  return (
    <S.AccountInfo>
      <legend>계정 정보</legend>

      <div className="field">
        <S.Error_Wrapper>
          <label htmlFor="username">아이디</label>
          {/* 회원정보 수정일 때 항상 표시 */}
          {isEdit && <p className="error">아이디는 변경할 수 없습니다.</p>}

          {/* 회원가입일 때만 기존 에러 */}
          {!isEdit && errors.usernameChecked && (
            <p className="error">{String(errors.usernameChecked.message)}</p>
          )}

          {isEdit || (
            <button type="button" onClick={handleCheckUsername}>
              중복체크
            </button>
          )}
        </S.Error_Wrapper>

        {/* ✅ 토스트 팝업 */}
        {checkMessage && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              opacity: fadeOut ? 0 : 1,
              transition: "opacity 0.5s ease",
              pointerEvents: fadeOut ? "none" : "auto",
            }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px 30px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                transform: fadeOut ? "translateY(-20px)" : "translateY(0)",
                transition: "all 0.5s ease",
              }}
            >
              {checkMessage}
            </div>
          </div>
        )}

        <input
          id="username"
          {...register("username" as Path<T>)}
          placeholder={isEdit ? "" : "아이디"}
          readOnly={!!isEdit}
        />
      </div>

      <div className="field">
        <S.Error_Wrapper>
          <label htmlFor="password">비밀번호</label>
          {errors.password && (
            <p className="error">{errors.password.message?.toString()}</p>
          )}
        </S.Error_Wrapper>

        <input
          id="password"
          type="password"
          placeholder="비밀번호"
          {...register("password" as Path<T>)}
          readOnly={false}
        />
      </div>

      <div className="field">
        <S.Error_Wrapper>
          <label htmlFor="passwordConfirm">비밀번호 확인</label>
          {errors.passwordConfirm && (
            <p className="error">
              {errors.passwordConfirm.message?.toString()}
            </p>
          )}
        </S.Error_Wrapper>

        <input
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호 확인"
          {...register("passwordConfirm" as Path<T>)}
        />
      </div>
    </S.AccountInfo>
  );
}
