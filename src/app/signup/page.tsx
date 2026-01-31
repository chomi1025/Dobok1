"use client";
import * as S from "./style";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ObjectSchema } from "yup";
import BirthdayInputComponent from "./BirthdayInput";
import PersonalInfoInputComponent from "./PersonalInfo";
import AddressInputComponent from "./AddressInput";
import AccountComponent from "./AccountInfo";
import EmailComponent from "./EmailInfo";
import CheckComponent from "./Checkinput";
import TermsModal from "@/components/terms/Termsmodal";
import { FormType } from "./types";

interface PhoneType {
  prefix: string;
  middle: string;
  last: string;
}

type TermsType = "service" | "privacy";

export const schema: ObjectSchema<FormType> = yup.object({
  username: yup
    .string()
    .required("아이디는 필수입니다.")
    .min(4, "4글자 이상")
    .max(20, "20글자 이하") // 원하는 최대 글자수
    .matches(
      /^[A-Za-z0-9]+$/, // ✅ 영어 대소문자 + 숫자만 허용
      "아이디는 영어와 숫자만 사용 가능합니다.",
    ),
  usernameChecked: yup
    .boolean()
    .required("아이디 중복체크를 해주세요.")
    .oneOf([true], "아이디 중복체크를 해주세요."),
  password: yup
    .string()
    .required("비밀번호는 필수입니다.")
    .min(8, "8글자 이상 입력해주세요.")
    .max(20, "20글자 이하 입력해주세요.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/,
      "영문, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.",
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인은 필수입니다."),
  name: yup.string().required("이름은 필수입니다."),
  phone: yup
    .object({
      prefix: yup.string().required(),
      middle: yup.string().required(),
      last: yup.string().required(),
    })
    .required(),
  email: yup
    .string()
    .email("이메일 형식이 아닙니다")
    .required("이메일은 필수입니다."),
  address: yup
    .object({
      address: yup.string().required("주소를 입력해주세요"),
      zipCode: yup.string().required("우편번호를 입력해주세요"),
      address2: yup.string().required("상세주소를 입력해주세요"),
    })
    .test(
      "all-fields-filled",
      "주소를 정확히 입력해주세요.",
      (value) => !!value?.address && !!value?.zipCode && !!value?.address2,
    )
    .required(),
  birthDate: yup.string().required("생년월일은 필수입니다."),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "약관에 동의해야 합니다")
    .required("약관 체크는 필수입니다."),
});

export default function SignupClient() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver<FormType, any, any>(schema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      usernameChecked: false, // ✅
      password: "",
      passwordConfirm: "",
      name: "",
      phone: { prefix: "010", middle: "", last: "" }, // <- 여기 중요!!!
      email: "",
      address: { address: "", zipCode: "", address2: "" },
      birthDate: "",
      agreeTerms: false,
    },
    shouldUnregister: true, // defaultValue에 따라 오류 초기화
  });

  //모달관련(약관동의)
  const [termsOpen, setTermsOpen] = useState(false);
  const [termsType, setTermsType] = useState<TermsType>("service");

  // 우편번호 찾기(다음)
  const [isPostOpen, setIsPostOpen] = useState(false);

  const [emailDomain, setEmailDomain] = useState("gmail.com"); // 기본값

  // 회원가입 버튼
  const onSubmit: SubmitHandler<FormType> = async (data) => {
    console.log("submit", data); // <- 여기 꼭 찍어보기
    const fullPhone = `${data.phone.prefix}-${data.phone.middle}-${data.phone.last}`;

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
          email: data.email,
          name: data.name,
          phone: fullPhone,
          address: data.address,
          birth_date: data.birthDate,
        }),
      });

      const resData = await res.json();
      if (resData.error) return alert(resData.error);

      alert("회원가입 완료!");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("회원가입 실패");
    }
  };

  return (
    <>
      <S.Inner>
        <S.Title_Wrapper>
          <h2>회원가입</h2>
          <p>도복일번지에 가입하시고 다양한 혜택을 받아보세요! </p>
        </S.Title_Wrapper>

        <S.Line />

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Form_Inner>
            {/* 계정정보:아이디,비밀번호 */}

            <AccountComponent
              register={register}
              errors={errors}
              setValue={setValue}
              clearErrors={clearErrors}
              isEdit={false}
            />

            {/* 개인정보:이름,핸드폰번호 */}
            <PersonalInfoInputComponent control={control} errors={errors} />

            {/* 주소 */}
            <AddressInputComponent control={control} errors={errors} />

            {/* 이메일 */}
            <EmailComponent
              control={control}
              errors={errors}
              emailDomain={emailDomain}
              setEmailDomain={setEmailDomain}
            />

            {/* 생년월일 */}
            <BirthdayInputComponent control={control} errors={errors} />
          </S.Form_Inner>

          {/* 구분선 */}
          <S.Line2 />

          {/* 약관 동의 */}
          <CheckComponent
            register={register}
            errors={errors}
            onOpenTerms={(type) => {
              setTermsType(type);
              setTermsOpen(true);
            }}
          />

          {/* 모달창 */}
          <TermsModal
            open={termsOpen}
            type={termsType} // ✅ 이거 추가
            onClose={() => setTermsOpen(false)}
          />

          {/*  회원가입 버튼 */}
          <S.Signup_Button type="submit">회원가입</S.Signup_Button>
        </S.Form>
      </S.Inner>
    </>
  );
}
