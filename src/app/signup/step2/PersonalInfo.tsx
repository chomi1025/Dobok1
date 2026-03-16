"use client";
import * as S from "./style";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";
import Script from "next/script";

declare global {
  interface Window {
    IMP: any;
  }
}

type Props<T extends FieldValues> = {
  control: Control<T>;
  setValue: UseFormSetValue<T>;
  isEdit?: boolean;
  errors?: FieldErrors<T>;
};

export default function PersonalInfo<T extends FieldValues>({
  control,
  setValue,
}: Props<T>) {
  const handleCertification = () => {
    const { IMP } = window;
    IMP.init(process.env.NEXT_PUBLIC_IMP_CODE);

    IMP.certification(
      {
        pg: "inicis_unified.MIIiasTest",
        merchant_uid: `cert_${new Date().getTime()}`,
        popup: true,
        name: "",
        phone: "",
      },

      async (rsp: any) => {
        if (rsp.success) {
          const response = await fetch("/api/auth/verify-cert", {
            method: "POST",
            body: JSON.stringify({ imp_uid: rsp.imp_uid }),
          });

          if (response.ok) {
            const result = await response.json();
            const userData = result.data;

            setValue("name" as Path<T>, userData.name);

            if (userData.phone) {
              const p = userData.phone;
              setValue("phone.prefix" as Path<T>, p.slice(0, 3));
              setValue("phone.middle" as Path<T>, p.slice(3, 7));
              setValue("phone.last" as Path<T>, p.slice(7, 11));
            }

            if (userData.birthday) {
              setValue("birthDate" as Path<T>, userData.birthday);
            }

            alert("본인인증이 완료되었습니다.");
          }
        } else {
          alert(`인증 실패: ${rsp.error_msg}`);
        }
      },
    );
  };

  return (
    <S.PersonalInfo>
      <legend>개인 정보</legend>

      {/* 이름 */}
      <Controller
        name={"name" as Path<T>}
        control={control}
        render={({ field }) => (
          <div className="field">
            <S.Error_Wrapper>
              <label htmlFor="name">이름</label>
            </S.Error_Wrapper>

            <input {...field} placeholder="이름" readOnly />
          </div>
        )}
      />

      {/* 핸드폰 번호 */}
      <S.Phone className="field">
        <S.Error_Wrapper>
          <label htmlFor="phone">핸드폰 번호</label>
        </S.Error_Wrapper>

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
              />
            )}
          />

          <Script src="https://cdn.iamport.kr/v1/iamport.js" />
          <button onClick={handleCertification} type="button">
            본인인증
          </button>
        </div>
      </S.Phone>
    </S.PersonalInfo>
  );
}
