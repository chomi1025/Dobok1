"use client";
import styles from "./birthdayInput.module.scss";

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
          <div className={styles.birthday}>
            <div className={styles.errorWrapper}>
              <label>생년월일</label>

              {isEdit && (
                <p className="error">생년월일은 변경할 수 없습니다.</p>
              )}

              {!isEdit && errors.birthDate && (
                <p className="error">{String(errors.birthDate.message)}</p>
              )}
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <span className={styles.inputWrapper}>
                <input type="text" readOnly value={year} />
              </span>

              <span className={styles.inputWrapper}>
                <input type="text" readOnly value={month} />
              </span>

              <span className={styles.inputWrapper}>
                <input type="text" readOnly value={day} />
              </span>
            </div>
          </div>
        );
      }}
    />
  );
}
