"use client";
import * as S from "./style";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ObjectSchema } from "yup";
import TermsModal from "@/components/terms/Termsmodal";
import type { FormType } from "./types";
import toast from "react-hot-toast";
import AccountInfo from "./AccountInfo";
import PersonalInfo from "./PersonalInfo";
import AddressInput from "./AddressInput";
import EmailInfo from "./EmailInfo";
import BirthdayInput from "./BirthdayInput";

type TermsType = "service" | "privacy";

const schema: ObjectSchema<Omit<FormType, "agreeTerms">> = yup.object({
  username: yup
    .string()
    .required("아이디는 필수입니다.")
    .min(4, "4글자 이상")
    .max(20, "20글자 이하")
    .matches(/^[A-Za-z0-9]+$/, "아이디는 영어와 숫자만 사용 가능합니다."),
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
      postCode: yup.string().required("우편번호를 입력해주세요"),
      detailAddress: yup.string().required("상세주소를 입력해주세요"),
    })
    .test(
      "all-fields-filled",
      "주소를 정확히 입력해주세요.",
      (value) =>
        !!value?.address && !!value?.postCode && !!value?.detailAddress,
    )
    .required(),
  birthDate: yup.string().required("생년월일은 필수입니다."),
});

export default function SignupStep2Client() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema) as any,
    mode: "onSubmit",
    defaultValues: {
      username: "",
      usernameChecked: false,
      password: "",
      passwordConfirm: "",
      name: "",
      phone: { prefix: "", middle: "", last: "" },
      email: "",
      address: { address: "", postCode: "", detailAddress: "" },
      birthDate: "",
    },
    shouldUnregister: true,
  });

  //모달관련(약관동의)
  const [termsOpen, setTermsOpen] = useState(false);
  const [termsType, setTermsType] = useState<TermsType>("service");

  // 우편번호 찾기(다음)
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [userCi, setUserCi] = useState<string | null>(null);
  const [emailDomain, setEmailDomain] = useState("gmail.com");

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    const fullPhone = `${data.phone.prefix}-${data.phone.middle}-${data.phone.last}`;
    console.log(data);
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
          ci: userCi,
        }),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(
          resData.message || resData.error || "회원가입에 실패했습니다.",
        );
      }
      toast.success("회원가입이 완료되었습니다.");
      sessionStorage.removeItem("signup_step1");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message, { duration: 3000 });
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("signup_step1");
    if (!saved) {
      alert("인증 정보가 없습니다. 다시 인증해주세요.");
      router.replace("/signup/step1");
      return;
    }

    const data = JSON.parse(saved);
    setValue("name", data.name);
    setValue("birthDate", data.birthday);

    if (data.phone) {
      const purePhone = data.phone.replace(/-/g, "");
      setValue("phone.prefix", purePhone.slice(0, 3));
      setValue("phone.middle", purePhone.slice(3, 7));
      setValue("phone.last", purePhone.slice(7, 11));
    }

    setValue("agreeTerms", true);
  }, [setValue, router]);

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
            <AccountInfo
              register={register}
              errors={errors}
              setValue={setValue}
              getValues={getValues}
              watch={watch}
              clearErrors={clearErrors}
              isEdit={false}
            />

            {/* 개인정보:이름,핸드폰번호 */}
            <PersonalInfo control={control} />

            {/* 주소 */}
            <AddressInput control={control} errors={errors} />

            {/* 이메일 */}
            <EmailInfo
              control={control}
              errors={errors}
              emailDomain={emailDomain}
              setEmailDomain={setEmailDomain}
            />

            {/* 생년월일 */}
            <BirthdayInput control={control} errors={errors} />
          </S.Form_Inner>

          {/* 구분선 */}
          <S.Line2 />

          {/* 모달창 */}
          <TermsModal
            open={termsOpen}
            type={termsType}
            onClose={() => setTermsOpen(false)}
          />

          {/*  회원가입 버튼 */}
          <S.Signup_Button type="submit">회원가입</S.Signup_Button>
        </S.Form>
      </S.Inner>
    </>
  );
}
