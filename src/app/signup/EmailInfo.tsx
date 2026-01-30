"use client";
import * as S from "./style";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormType } from "./types";

type Props = {
  control: Control<FormType>;
  errors: FieldErrors<FormType>;
  emailDomain: string;
  setEmailDomain: (domain: string) => void;
};

export default function EmailComponent({
  control,
  errors,
  emailDomain,
  setEmailDomain,
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
              {errors.email && <p>{errors.email.message}</p>}
            </S.Error_Wrapper>

            <div>
              <input
                id="email"
                type="text"
                placeholder="이메일"
                value={value.split("@")[0] || ""}
                onChange={(e) => onChange(`${e.target.value}@${emailDomain}`)}
              />

              <S.Email_Selectwrapper>
                <select
                  value={emailDomain}
                  onChange={(e) => {
                    setEmailDomain(e.target.value);
                    const localPart = value.split("@")[0];
                    onChange(`${localPart}@${e.target.value}`);
                  }}
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
