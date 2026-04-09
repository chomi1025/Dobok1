"use client";
import * as S from "./style";

import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useState } from "react";

type Props<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  isEdit?: boolean;
};

export default function AddressInput<T extends FieldValues>({
  control,
  errors,
}: Props<T>) {
  const [isPostOpen, setIsPostOpen] = useState(false);

  return (
    <Controller
      name={"address" as Path<T>}
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

        return (
          <S.address className="field">
            <S.Error_Wrapper>
              <label htmlFor="address">주소</label>

              {errors.address && (
                <p className="error">{String(errors.address.message)}</p>
              )}
            </S.Error_Wrapper>

            <div>
              <input
                type="text"
                placeholder="우편번호"
                value={postCode}
                readOnly
              />
              <button type="button" onClick={() => setIsPostOpen(true)}>
                우편번호 찾기
              </button>
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
          </S.address>
        );
      }}
    />
  );
}
