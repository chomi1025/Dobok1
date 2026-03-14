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

export default function BirthdayInputComponent<T extends FieldValues>({
  control,
  errors,
  isEdit,
}: Props<T>) {
  return (
    <Controller
      name={"birthDate" as Path<T>}
      control={control}
      render={({ field: { value, onChange } }) => {
        const [year, month, day] = value ? value.split("-") : ["", "", ""];

        const handleChange = (
          newYear: string,
          newMonth: string,
          newDay: string,
        ) => {
          const parts = [];
          if (newYear) parts.push(newYear);
          if (newMonth) parts.push(newMonth.padStart(2, "0"));
          if (newDay) parts.push(newDay.padStart(2, "0"));
          onChange(parts.join("-"));
        };

        return (
          <S.Birthday className="field">
            <S.Error_Wrapper>
              <label htmlFor="birthDate">생년월일</label>

              {isEdit && (
                <p className="error">생년월일은 변경할 수 없습니다.</p>
              )}

              {!isEdit && errors.birthDate && (
                <p className="error">{String(errors.birthDate.message)}</p>
              )}
            </S.Error_Wrapper>

            <div style={{ display: "flex", gap: "5px" }}>
              <S.Select_box>
                <select
                  value={year || ""}
                  onChange={(e) =>
                    handleChange(e.target.value, month || "", day || "")
                  }
                  disabled={isEdit}
                >
                  <option value="">----</option>
                  {Array.from({ length: 100 }, (_, i) => 2026 - i).map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </S.Select_box>

              {/* Month */}
              <S.Select_box>
                <select
                  value={month || ""}
                  onChange={(e) =>
                    handleChange(year || "", e.target.value, day || "")
                  }
                  disabled={isEdit}
                >
                  <option value="">--</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m.toString().padStart(2, "0")}>
                      {m.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </S.Select_box>

              <S.Select_box>
                <select
                  value={day || ""}
                  onChange={(e) =>
                    handleChange(year || "", month || "", e.target.value)
                  }
                  disabled={isEdit}
                >
                  <option value="">--</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d.toString().padStart(2, "0")}>
                      {d.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </S.Select_box>
            </div>
          </S.Birthday>
        );
      }}
    />
  );
}
