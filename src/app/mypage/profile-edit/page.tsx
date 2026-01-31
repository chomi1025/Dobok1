"use client";

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

/* =======================
   타입
======================= */
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
   mock user (서버 연동 전)
======================= */
const mockUser: ProfileEditFormType = {
  name: "홍길동",
  phone: { prefix: "010", middle: "1234", last: "5678" },
  email: "test@gmail.com",
  address: {
    address: "서울시 강남구",
    zipCode: "12345",
    address2: "101동",
  },
  birthDate: "1996-03-27",
};

/* =======================
   component
======================= */
export default function ProfileEdit() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileEditFormType>({
    resolver: yupResolver(profileEditSchema),
    defaultValues: {
      ...mockUser,
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (data: ProfileEditFormType) => {
    console.log("회원정보 수정", data);
    // TODO: PATCH /api/profile
  };

  return (
    <M.Contents isEdit={true}>
      <h2>회원 정보 수정</h2>
      <span />

      <P.Form onSubmit={handleSubmit(onSubmit)}>
        <P.Form_Inner>
          {/* 비밀번호 변경 (선택) */}
          <AccountComponent register={register} errors={errors} isEdit={true} />

          <PersonalInfoInputComponent control={control} errors={errors} />

          <AddressInputComponent control={control} errors={errors} />

          <EmailComponent control={control} errors={errors} />
          <BirthdayInputComponent control={control} errors={errors} />
        </P.Form_Inner>

        {/*  회원가입 버튼 */}
        <P.Signup_Button style={{ marginTop: "50px" }} type="submit">
          수정하기
        </P.Signup_Button>
      </P.Form>
    </M.Contents>
  );
}
