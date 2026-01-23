"use client";
import * as S from "./style";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormType } from "./page";

type Props = {
  control: Control<FormType>;
  errors: FieldErrors<FormType>;
};

export default function PersonalInfoInputComponent({ control, errors }: Props) {
  return (
    <S.PersonalInfo>
      <legend>개인 정보</legend>

      {/* 이름 */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <div className="field">
            <S.Error_Wrapper>
              <label htmlFor="name">이름</label>
              {errors.name && <p>{errors.name.message}</p>}
            </S.Error_Wrapper>

            <input {...field} placeholder="이름" />
          </div>
        )}
      />

      {/* 핸드폰 번호 */}

      <S.Phone className="field">
        <S.Error_Wrapper>
          <label htmlFor="phone">핸드폰 번호</label>
          {/* 에러 */}
          {(errors.phone?.prefix ||
            errors.phone?.middle ||
            errors.phone?.last) && (
            <p style={{ color: "red" }}>핸드폰 번호를 확인해주세요.</p>
          )}
        </S.Error_Wrapper>

        <div>
          {/* prefix */}
          <Controller
            name="phone.prefix"
            control={control}
            render={({ field }) => (
              <select {...field}>
                <option value="010">010</option>
                <option value="011">011</option>
                <option value="016">016</option>
                <option value="017">017</option>
                <option value="018">018</option>
                <option value="019">019</option>
              </select>
            )}
          />

          {/* middle */}
          <Controller
            name="phone.middle"
            control={control}
            render={({ field }) => <input {...field} />}
          />

          {/* last */}
          <Controller
            name="phone.last"
            control={control}
            render={({ field }) => <input {...field} />}
          />

          <button type="button">본인인증</button>
        </div>
      </S.Phone>
    </S.PersonalInfo>
  );
}
