"use client";
import * as S from "./style";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormType } from "./types";

type Props = {
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
  onOpenTerms: (type: "service" | "privacy") => void;
};

export default function CheckComponent({
  register,

  onOpenTerms,
}: Props) {
  return (
    <S.Check_Wrapper>
      <fieldset>
        <legend>약관 동의</legend>

        <label>
          <input type="checkbox" {...register("agreeTerms")} />
          <p>
            도복일번지의 이용약관(필수), 개인정보 수집 및 이용(필수)에 모두
            동의합니다.
          </p>
        </label>

        <label>
          <input type="checkbox" required />
          <p>
            <span>[필수] </span>만 14세 이상입니다.
          </p>
        </label>

        <label>
          <input type="checkbox" required />
          <p>
            <span>[필수] </span>이용약관
          </p>
          <button
            type="button"
            onClick={() => {
              onOpenTerms("service");
            }}
            className="terms-link"
          >
            전체보기 <span aria-hidden>›</span>
          </button>
        </label>

        <label>
          <input type="checkbox" />
          <p>
            <span>[필수] </span>개인정보 수집 및 이용
          </p>
          <button
            type="button"
            onClick={() => {
              onOpenTerms("privacy");
            }}
            className="terms-link"
          >
            전체보기 <span aria-hidden>›</span>
          </button>
        </label>
      </fieldset>
    </S.Check_Wrapper>
  );
}
