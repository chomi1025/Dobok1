"use client";
import * as S from "./style";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormType } from "./types";

type Props = {
  control: Control<FormType>;
  errors: FieldErrors<FormType>;
  emailDomain: string;
  setEmailDomain: (domain: string) => void;
  isEdit: boolean;
};

export default function EmailComponent({
  control,
  errors,
  emailDomain,
  setEmailDomain,
  isEdit,
}: Props) {
  return (
    <S.EmailInfo>
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange } }) => (
          <S.Email className="field">
            <S.Error_Wrapper>
              <label htmlFor="email">이메일</label>

              {/* 수정 모드면 변경 불가 메시지 */}
              {isEdit && <p className="error">이메일은 변경할 수 없습니다.</p>}

              {/* 수정 모드 아닐 때만 에러 표시 */}
              {!isEdit && errors.email && (
                <p className="error">{errors.email.message}</p>
              )}
            </S.Error_Wrapper>

            <div>
              <input
                id="email"
                type="text"
                placeholder="이메일"
                value={value.split("@")[0] || ""}
                onChange={(e) => onChange(`${e.target.value}@${emailDomain}`)}
                disabled={isEdit} // ← 수정 모드면 입력 불가
              />

              <S.Email_Selectwrapper>
                <select
                  value={emailDomain}
                  onChange={(e) => {
                    setEmailDomain(e.target.value);
                    const localPart = value.split("@")[0];
                    onChange(`${localPart}@${e.target.value}`);
                  }}
                  disabled={isEdit} // ← 수정 모드면 입력 불가
                >
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="hanmail.net">hanmail.net</option>
                </select>

                <S.Arrow />
              </S.Email_Selectwrapper>
            </div>
          </S.Email>
        )}
      />
    </S.EmailInfo>
  );
}
