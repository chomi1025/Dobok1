"use client";
import styles from "./addressInput.module.scss";

import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useState } from "react";
import Button from "@/components/common/buttons/page";
import { ProfileEditFormType } from "@/app/mypage/profile-edit/page.client";

type Props<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  isEdit?: boolean;
};

export default function AddressInput<T extends FieldValues>({
  control,
  errors,
  isEdit,
}: Props<T>) {
  const [isPostOpen, setIsPostOpen] = useState(false);

  return (
    <Controller
      name={"address" as any}
      control={control}
      defaultValue={{ address: "", postCode: "", detailAddress: "" } as any}
      render={({ field: { value, onChange } }) => {
        const handleComplete = (data: any) => {
          onChange({
            ...value,
            postCode: data.zonecode,
            address: data.roadAddress || data.jibunAddress,
          });
          setIsPostOpen(false);
        };

        const postCode = value?.postCode || "";
        const address = value?.address || "";
        const detailAddress = value?.detailAddress || "";
        const addressErrors = errors.address as any;

        return (
          <fieldset className={styles.address}>
            <div className={styles.errorWrapper}>
              <label htmlFor="address">주소</label>

              {addressErrors?.postCode && (
                <p className="error">{addressErrors.postCode.message}</p>
              )}
              {addressErrors?.address && (
                <p className="error">{addressErrors.address.message}</p>
              )}
              {addressErrors?.detailAddress && (
                <p className="error">{addressErrors.detailAddress.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="우편번호"
                value={postCode}
                readOnly
              />
              <Button variant="black" onClick={() => setIsPostOpen(true)}>
                우편번호 찾기
              </Button>
            </div>

            {isPostOpen && <DaumPostcodeEmbed onComplete={handleComplete} />}

            <input type="text" placeholder="주소" value={address} readOnly />

            <input
              type="text"
              placeholder="상세주소"
              value={detailAddress}
              onChange={(e) =>
                onChange({ ...value, detailAddress: e.target.value })
              }
            />
          </fieldset>
        );
      }}
    />
  );
}
