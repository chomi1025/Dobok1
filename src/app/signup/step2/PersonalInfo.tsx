"use client";
import * as S from "./style";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

declare global {
  interface Window {
    IMP: any;
  }
}

type Props<T extends FieldValues> = {
  control: Control<T>;
  isEdit?: boolean;
  errors?: FieldErrors<T>;
};

export default function PersonalInfo<T extends FieldValues>({
  control,
}: Props<T>) {
  return (
    <S.PersonalInfo>
      <legend>개인 정보</legend>

      {/* 이름 */}
      <Controller
        name={"name" as Path<T>}
        control={control}
        render={({ field }) => (
          <div className="field">
            <S.Error_Wrapper>
              <label htmlFor="name">이름</label>
            </S.Error_Wrapper>

            <input {...field} placeholder="이름" readOnly />
          </div>
        )}
      />

      {/* 핸드폰 번호 */}
      <S.Phone className="field">
        <S.Error_Wrapper>
          <label htmlFor="phone">핸드폰 번호</label>
        </S.Error_Wrapper>

        <div>
          <Controller
            name={"phone.prefix" as Path<T>}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                readOnly
                inputMode="numeric"
                maxLength={3}
                placeholder="000"
              />
            )}
          />

          <Controller
            name={"phone.middle" as Path<T>}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                readOnly
                inputMode="numeric"
                maxLength={4}
                placeholder="0000"
              />
            )}
          />

          <Controller
            name={"phone.last" as Path<T>}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                inputMode="numeric"
                maxLength={4}
                placeholder="0000"
                readOnly
              />
            )}
          />
        </div>
      </S.Phone>
    </S.PersonalInfo>
  );
}
