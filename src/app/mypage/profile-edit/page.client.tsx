"use client";

import { signIn } from "next-auth/react";
import * as M from "../style";
import * as P from "../../signup/style";
import AccountComponent from "@/app/signup/AccountInfo";
import PersonalInfoInputComponent from "@/app/signup/PersonalInfo";
import AddressInputComponent from "@/app/signup/AddressInput";
import EmailComponent from "@/app/signup/EmailInfo";
import BirthdayInputComponent from "@/app/signup/BirthdayInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { ObjectSchema } from "yup";
import Router from "next/router";
import { useRouter } from "next/navigation";

/* =======================
   타입
======================= */
interface ProfileEditProps {
  user: ProfileEditUser;
  isEdit: boolean;
}

export interface ProfileEditUser {
  id: number; // 내부용
  username: string; // 👈 사용자 아이디
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

/* =======================
   yup schema
======================= */
const profileEditSchema: ObjectSchema<ProfileEditFormType> = yup.object({
  password: yup
    .string()
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

  phone: yup.object({
    prefix: yup.string().required(),
    middle: yup.string().required(),
    last: yup.string().required(),
  }),

  email: yup.string().email("이메일 형식이 아닙니다.").required(),

  address: yup.object({
    address: yup.string().required(),
    zipCode: yup.string().required(),
    address2: yup.string().required(),
  }),

  birthDate: yup.string().required(),
});

/* =======================
   component
======================= */
export default function ProfileEdit({ user, isEdit }: ProfileEditProps) {
  const router = useRouter();
  const [prefix = "010", middle = "", last = ""] = user.phone?.split("-") ?? [];

  const {
    register,
    control,
    handleSubmit,
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
        // 비밀번호 바꾼 경우 새 세션 받고 이동
        const signInResult = await signIn("credentials", {
          redirect: false,
          username: user.username,
          password: data.password,
        });

        if (!signInResult?.ok) {
          alert("비밀번호 변경 후 재로그인 실패");
          return;
        }

        // 세션 반영을 잠깐 기다리기 (200ms 정도)
        await new Promise((resolve) => setTimeout(resolve, 200));

        router.push("/"); // 새 세션 적용 후 홈으로 이동
      } else {
        router.push("/mypage"); // 비밀번호 안 바꾸면 기존대로 마이페이지
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <M.Contents isEdit={true}>
      <h2>회원 정보 수정</h2>
      <span />

      <P.Form onSubmit={handleSubmit(onSubmit)}>
        <P.Form_Inner>
          {/* 비밀번호 변경 (선택) */}
          <AccountComponent register={register} errors={errors} isEdit={true} />

          <PersonalInfoInputComponent
            control={control}
            errors={errors}
            isEdit={true}
          />

          <AddressInputComponent
            control={control}
            errors={errors}
            isEdit={true}
          />

          <EmailComponent control={control} errors={errors} isEdit={true} />

          <BirthdayInputComponent
            control={control}
            errors={errors}
            isEdit={true}
          />
        </P.Form_Inner>

        {/*  회원가입 버튼 */}
        <P.Signup_Button
          isEdit={true}
          style={{ marginTop: "50px" }}
          type="submit"
        >
          수정하기
        </P.Signup_Button>
      </P.Form>
    </M.Contents>
  );
}
