"use client";
import styles from "./emailInfo.module.scss";
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
  emailDomain: string;
  setEmailDomain: (domain: string) => void;
  isEdit?: boolean;
};

export default function EmailInfo<T extends FieldValues>({
  control,
  errors,
  emailDomain,
  setEmailDomain,
  isEdit,
}: Props<T>) {
  return (
    <fieldset className={styles.emailInfo}>
      <Controller
        name={"email" as Path<T>}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className={styles.email}>
            <div className={styles.errorWrapper}>
              <label htmlFor="email">이메일</label>

              {isEdit && <p className="error">이메일은 변경할 수 없습니다.</p>}

              {!isEdit && errors.email && (
                <p className="error">{String(errors.email.message)}</p>
              )}
            </div>

            <div>
              <input
                id="email"
                type="text"
                placeholder="이메일"
                value={(value || "").split("@")[0] || ""}
                onChange={(e) => onChange(`${e.target.value}@${emailDomain}`)}
                disabled={isEdit}
              />

              <div className={styles.emailSelectWrapper}>
                <select
                  value={emailDomain}
                  onChange={(e) => {
                    const newDomain = e.target.value;
                    setEmailDomain(newDomain);
                    const localPart = (value || "").split("@")[0];
                    onChange(`${localPart}@${newDomain}`);
                  }}
                  disabled={isEdit}
                >
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="hanmail.net">hanmail.net</option>
                </select>

                <span className={styles.arrow} />
              </div>
            </div>
          </div>
        )}
      />
    </fieldset>
  );
}
