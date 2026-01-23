"use client";
import * as S from "./style";
import { Control, Controller, FieldErrors } from "react-hook-form";
import type { FormType } from "./page";

type Props = {
  control: Control<FormType>;
  errors: FieldErrors<FormType>;
};

export default function BirthdayInputComponent({ control, errors }: Props) {
  return (
    <Controller
      name="birthDate"
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
              {errors.birthDate && <p>{errors.birthDate.message}</p>}
            </S.Error_Wrapper>

            <div style={{ display: "flex", gap: "5px" }}>
              {/* Year */}
              <S.Select_box>
                <select
                  value={year || ""}
                  onChange={(e) =>
                    handleChange(e.target.value, month || "", day || "")
                  }
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
                >
                  <option value="">--</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m.toString().padStart(2, "0")}>
                      {m.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </S.Select_box>

              {/* Day */}
              <S.Select_box>
                <select
                  value={day || ""}
                  onChange={(e) =>
                    handleChange(year || "", month || "", e.target.value)
                  }
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
