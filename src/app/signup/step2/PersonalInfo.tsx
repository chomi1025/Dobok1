"use client";
import styles from "./personalInfo.module.scss";

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
  isEdit,
  errors,
}: Props<T>) {
  return (
    <fieldset className={styles.personalInfo}>
      <legend>개인 정보</legend>

      {/* 이름 */}
      <Controller
        name={"name" as Path<T>}
        control={control}
        render={({ field }) => (
          <div className={styles.field}>
            <div className={styles.errorWrapper}>
              <label htmlFor="name">이름</label>

              {isEdit && <p className="error">이름은 변경할 수 없습니다.</p>}
            </div>

            <input {...field} placeholder="이름" readOnly />
          </div>
        )}
      />

      {/* 핸드폰 번호 */}
      <div className={styles.phone}>
        <div className={styles.errorWrapper}>
          <label htmlFor="phone">핸드폰 번호</label>

          {isEdit && <p className="error">핸드폰 번호는 변경할 수 없습니다.</p>}
        </div>

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
      </div>
    </fieldset>
  );
}
