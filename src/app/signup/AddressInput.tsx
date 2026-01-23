"use client";
import * as S from "./style";
import { Control, Controller, FieldErrors } from "react-hook-form";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useState } from "react";
import type { FormType } from "./page";

type Props = {
  control: Control<FormType>;
  errors: FieldErrors<FormType>;
};

export default function AddressInputComponent({ control, errors }: Props) {
  const [isPostOpen, setIsPostOpen] = useState(false);

  return (
    <Controller
      name="address"
      control={control}
      defaultValue={{ address: "", zipCode: "", address2: "" }}
      render={({ field: { value, onChange } }) => {
        const handleComplete = (data: any) => {
          onChange({
            ...value,
            zipCode: data.zonecode,
            address: data.roadAddress || data.jibunAddress,
          });
          setIsPostOpen(false); // 팝업 닫기
        };

        const isAddressInvalid =
          !value?.zipCode || !value?.address || !value?.address2;

        return (
          <S.address className="field">
            <S.Error_Wrapper>
              <label htmlFor="address">주소</label>
              {errors.address && <p>{errors.address.message}</p>}
            </S.Error_Wrapper>

            <div>
              <input
                type="text"
                placeholder="우편번호"
                value={value.zipCode}
                readOnly
              />
              <button type="button" onClick={() => setIsPostOpen(true)}>
                우편번호 찾기
              </button>
            </div>

            {/** 다음 우편번호 API */}
            {isPostOpen && <DaumPostcodeEmbed onComplete={handleComplete} />}

            <input
              type="text"
              placeholder="주소"
              value={value.address}
              readOnly
            />

            <input
              type="text"
              placeholder="상세주소"
              value={value.address2}
              onChange={(e) => onChange({ ...value, address2: e.target.value })}
            />
          </S.address>
        );
      }}
    />
  );
}
