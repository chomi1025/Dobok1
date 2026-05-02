"use client";
import { useEffect, useState } from "react";
import styles from "./personalInfo.module.scss";

import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import toast from "react-hot-toast";

declare global {
  interface Window {
    IMP: any;
  }
}

type Props<T extends FieldValues> = {
  register: UseFormRegister<T>;
  isEdit?: boolean;
  errors: FieldErrors<T>;
  setValue?: UseFormSetValue<T>;
  clearErrors?: UseFormClearErrors<T>;
  watch: any;
  getValues: any;
};

export default function PersonalInfo<T extends FieldValues>({
  register,
  isEdit,
  errors,
  setValue,
  clearErrors,
  watch,
  getValues,
}: Props<T>) {
  const [isChecking, setIsChecking] = useState(false);
  const nickname = watch?.("nickname" as Path<T>);

  const handleCheckUsername = async () => {
    const nicknameValue = getValues("nickname" as Path<T>);

    if (!nicknameValue) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }

    const nicknameRegex = /^[가-힣A-Za-z0-9]{2,8}$/;
    if (!nicknameRegex.test(nicknameValue)) {
      toast.error("닉네임은 2~8자의 한글, 영문, 숫자만 가능합니다.");
      return;
    }

    setIsChecking(true);

    try {
      const res = await fetch(
        `/api/user/check/nickname?nickname=${nicknameValue}`,
      );

      const data = await res.json();

      if (data.exists) {
        toast.error("이미 사용 중인 닉네임입니다.");
        setValue?.("nicknameChecked" as Path<T>, false as any);
        return;
      }

      toast.success("사용 가능한 닉네임 입니다!");

      setValue?.("nicknameChecked" as Path<T>, true as any, {
        shouldValidate: true,
      });
      clearErrors?.("nicknameChecked" as Path<T>);
    } catch (error) {
      console.error(error);
      toast.error(" 서버 오류가 발생했습니다.");
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (!isEdit) {
      setValue?.("nicknameChecked" as Path<T>, false as any);
      clearErrors?.("nicknameChecked" as Path<T>);
    }
  }, [nickname]);

  return (
    <fieldset className={styles.personalInfo}>
      <legend>개인 정보</legend>

      {/* 이름 */}
      <div className={styles.field}>
        <div className={styles.errorWrapper}>
          <label htmlFor="name">이름</label>

          {errors.name && (
            <p className="error">{String(errors.name.message)}</p>
          )}

          {isEdit && <p className="error">이름은 변경할 수 없습니다.</p>}
        </div>

        <input
          id="name"
          {...register("name" as Path<T>)}
          placeholder="이름"
          readOnly
        />
      </div>

      {/* 닉네임 */}
      <div className={styles.field}>
        <div className={styles.errorWrapper}>
          <label htmlFor="nickname">닉네임</label>

          {errors.nickname && (
            <p className="error">{String(errors.nickname.message)}</p>
          )}

          {isEdit && <p className="error">닉네임은 변경할 수 없습니다.</p>}

          {isEdit || (
            <button
              className={isChecking ? styles.checkButton : ""}
              type="button"
              onClick={handleCheckUsername}
              disabled={isChecking}
              style={{
                opacity: isChecking ? 0.5 : 1,
                cursor: isChecking ? "not-allowed" : "pointer",
              }}
            >
              중복체크
            </button>
          )}
        </div>

        <input
          className={styles.nickname}
          id="nickname"
          {...register("nickname" as Path<T>)}
          placeholder="닉네임"
        />
      </div>

      {/* 핸드폰 번호 */}
      <div className={styles.phone}>
        <div className={styles.errorWrapper}>
          <label htmlFor="phone">핸드폰 번호</label>

          {errors.phone && (
            <p className="error">필수 항목을 모두 입력해주세요.</p>
          )}

          {isEdit && <p className="error">핸드폰 번호는 변경할 수 없습니다.</p>}
        </div>

        <div>
          <input
            {...register("phone.prefix" as Path<T>)}
            readOnly
            inputMode="numeric"
            maxLength={3}
            placeholder="000"
          />

          <input
            {...register("phone.middle" as Path<T>)}
            readOnly
            inputMode="numeric"
            maxLength={4}
            placeholder="0000"
          />

          <input
            {...register("phone.last" as Path<T>)}
            readOnly
            inputMode="numeric"
            maxLength={4}
            placeholder="0000"
          />
        </div>
      </div>
    </fieldset>
  );
}
