"use client";
import * as S from "./style";
import { Control, Controller, FieldErrors } from "react-hook-form";
import type { FormType } from "./types";

type Props = {
  control: Control<FormType>;
  errors: FieldErrors<FormType>;
  isEdit?: boolean;
};

export default function PersonalInfoInputComponent({
  control,
  errors,
  isEdit,
}: Props) {
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

              {/* 수정 모드면 변경 불가 메시지 */}
              {isEdit && <p className="error">이름은 변경할 수 없습니다.</p>}

              {/* 수정 모드 아닐 때만 에러 표시 */}
              {!isEdit && errors.name && (
                <p className="error">{errors.name.message}</p>
              )}
            </S.Error_Wrapper>

            <input {...field} placeholder="이름" disabled={isEdit} />
          </div>
        )}
      />

      {/* 핸드폰 번호 */}

      <S.Phone className="field">
        <S.Error_Wrapper>
          <label htmlFor="phone">핸드폰 번호</label>

          {/* 회원정보 수정일 때 항상 표시 */}
          {isEdit && <p className="error">핸드폰 번호는 변경할 수 없습니다.</p>}

          {/* 회원가입일 때만 에러 */}
          {!isEdit &&
            (errors.phone?.prefix ||
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
            render={({ field }) => (
              <input
                {...field}
                inputMode="numeric"
                maxLength={4}
                placeholder="0000"
                readOnly={isEdit}
                onChange={(e) => {
                  const onlyNumber = e.target.value.replace(/\D/g, "");
                  field.onChange(onlyNumber.slice(0, 4));
                }}
              />
            )}
          />

          {/* last */}
          <Controller
            name="phone.last"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                inputMode="numeric"
                maxLength={4}
                placeholder="0000"
                readOnly={isEdit}
                onChange={(e) => {
                  const onlyNumber = e.target.value.replace(/\D/g, "");
                  field.onChange(onlyNumber.slice(0, 4));
                }}
              />
            )}
          />

          <button type="button">본인인증</button>
        </div>
      </S.Phone>
    </S.PersonalInfo>
  );
}
