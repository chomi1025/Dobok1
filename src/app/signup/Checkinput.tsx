"use client";
import * as S from "./style";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormType } from "./page";

type Props = {
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
};

export default function CheckComponent({ register, errors }: Props) {
  return (
    <S.Check_Wrapper>
      <fieldset>
        <legend>약관 동의</legend>

        <label>
          <input type="checkbox" {...register("agreeTerms")} />
          <span>
            도복일번지의 이용약관(필수), 개인정보 수집 및 이용(필수)에 모두
            동의합니다.
          </span>
        </label>
        {errors.agreeTerms && (
          <p className="error">{errors.agreeTerms.message}</p>
        )}

        <label>
          <input type="checkbox" required />
          <span>[필수] 만 14세 이상입니다.</span>
        </label>

        <label>
          <input type="checkbox" required />
          <span>[필수] 이용약관</span>
        </label>

        <label>
          <input type="checkbox" />
          <span>[필수] 개인정보 수집 및 이용</span>
        </label>
      </fieldset>
    </S.Check_Wrapper>
  );
}
