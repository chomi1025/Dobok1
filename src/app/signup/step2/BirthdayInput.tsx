"use client";
import * as S from "./style";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  isEdit?: boolean;
};

export default function BirthdayInput<T extends FieldValues>({
  control,
  errors,
  isEdit,
}: Props<T>) {
  return (
    <Controller
      name={"birthDate" as Path<T>}
      control={control}
      render={({ field: { value } }) => {
        const [year, month, day] = value ? value.split("-") : ["", "", ""];

        return (
          <S.Birthday className="field">
            <S.Error_Wrapper>
              <label>생년월일</label>

              {isEdit && (
                <p className="error">생년월일은 변경할 수 없습니다.</p>
              )}

              {!isEdit && errors.birthDate && (
                <p className="error">{String(errors.birthDate.message)}</p>
              )}
            </S.Error_Wrapper>

            <div style={{ display: "flex", gap: "8px" }}>
              <S.Input>
                <input type="text" readOnly value={year} />
              </S.Input>

              <S.Input>
                <input type="text" readOnly value={month} />
              </S.Input>

              <S.Input>
                <input type="text" readOnly value={day} />
              </S.Input>
            </div>
          </S.Birthday>
        );
      }}
    />
  );
}
