"use client";

import { signIn } from "next-auth/react";
import * as M from "../style";
import * as P from "../../signup/step2/style";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { ObjectSchema } from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AccountInfo from "@/app/signup/step2/AccountInfo";
import PersonalInfo from "@/app/signup/step2/PersonalInfo";
import AddressInput from "@/app/signup/step2/AddressInput";
import EmailInfo from "@/app/signup/step2/EmailInfo";
import BirthdayInput from "@/app/signup/step2/BirthdayInput";

interface ProfileEditProps {
  user: ProfileEditUser;
  isEdit: boolean;
}

export interface ProfileEditUser {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string | null;
  birthDate: string;
  address: {
    address: string;
    zipCode: string;
    address2: string;
  };
}

export interface ProfileEditFormType {
  username?: string;
  password?: string;
  passwordConfirm?: string;
  name: string;
  phone: {
    prefix: string;
    middle: string;
    last: string;
  };
  email: string;
  address: {
    address: string;
    zipCode: string;
    address2: string;
  };
  birthDate: string;
}

const profileEditSchema: ObjectSchema<ProfileEditFormType> = yup.object({
  username: yup.string().optional(),
  password: yup
    .string()
    .transform((value) => (value === "" ? undefined : value))
    .optional()
    .min(8, "8글자 이상")
    .max(20, "20글자 이하")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])/,
      "영문, 숫자, 특수문자 포함",
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .optional(),
  name: yup.string().required("이름은 필수입니다."),
  phone: yup
    .object({
      prefix: yup.string().required(),
      middle: yup.string().required(),
      last: yup.string().required(),
    })
    .required(),
  email: yup.string().email("이메일 형식이 아닙니다.").required(),
  address: yup
    .object({
      address: yup.string().required(),
      zipCode: yup.string().required(),
      address2: yup.string().required(),
    })
    .required(),
  birthDate: yup.string().required(),
});

export default function ProfileEdit({ user, isEdit }: ProfileEditProps) {
  const router = useRouter();
  const [prefix = "010", middle = "", last = ""] = user.phone?.split("-") ?? [];
  const [emailDomain, setEmailDomain] = useState(
    user.email?.split("@")[1] || "gmail.com",
  );

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<ProfileEditFormType>({
    resolver: yupResolver(profileEditSchema),
    defaultValues: {
      username: isEdit && user?.username ? user.username : "",
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
      phone: {
        prefix,
        middle,
        last,
      },
      address: {
        address: user.address.address,
        zipCode: user.address.zipCode,
        address2: user.address.address2,
      },
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = async (data: ProfileEditFormType) => {
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          password: data.password,
          phone: `${data.phone.prefix}-${data.phone.middle}-${data.phone.last}`,
          email: data.email,
          address: data.address,
          birthDate: data.birthDate,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "업데이트 실패");
        return;
      }

      alert("회원정보가 수정되었습니다!");

      if (data.password) {
        const signInResult = await signIn("credentials", {
          redirect: false,
          username: user.username,
          password: data.password,
        });

        if (!signInResult?.ok) {
          alert("비밀번호 변경 후 재로그인 실패");
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 200));

        router.push("/");
      } else {
        router.push("/mypage");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <M.Contents>
      <h2>회원 정보 수정</h2>
      <span />

      <P.Form onSubmit={handleSubmit(onSubmit)}>
        <P.Form_Inner>
          {/* 비밀번호 변경 (선택) */}
          <AccountInfo
            register={register}
            errors={errors}
            isEdit={true}
            setValue={setValue}
            getValues={getValues}
            watch={watch}
            clearErrors={clearErrors}
          />

          <PersonalInfo
            control={control as any}
            setValue={setValue as any}
            errors={errors}
            isEdit={true}
          />

          <AddressInput control={control} errors={errors} isEdit={true} />

          <EmailInfo
            control={control}
            errors={errors}
            emailDomain={emailDomain}
            setEmailDomain={setEmailDomain}
            isEdit={true}
          />

          <BirthdayInput control={control} errors={errors} isEdit={true} />
        </P.Form_Inner>

        {/*  회원가입 버튼 */}
        <P.Signup_Button style={{ marginTop: "50px" }} type="submit">
          수정하기
        </P.Signup_Button>
      </P.Form>
    </M.Contents>
  );
}
