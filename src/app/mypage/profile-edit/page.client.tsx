"use client";

import { signIn } from "next-auth/react";
import styles from "./page.module.scss";
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
import Button from "@/components/common/buttons/page";

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
    postCode: string;
    detailAddress: string;
  };
  nickname: string;
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
    postCode: string;
    detailAddress: string;
  };
  birthDate: string;
  nickname: string;
  nicknameChecked?: boolean;
}

const editSchema: ObjectSchema<any> = yup.object({
  username: yup.string(),

  password: yup
    .string()
    .notRequired()
    .test("password-check", "8~20자, 영문/숫자/특수문자 포함", (value) => {
      if (!value) return true;
      return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#]).{8,20}$/.test(value);
    }),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), ""], "비밀번호가 일치하지 않습니다."),

  name: yup.string().required(),

  phone: yup.object({
    prefix: yup.string().required(),
    middle: yup.string().required(),
    last: yup.string().required(),
  }),

  email: yup.string().email().required(),

  address: yup.object({
    address: yup.string().required(),
    postCode: yup.string().required(),
    detailAddress: yup.string().required(),
  }),

  birthDate: yup.string().required(),

  nickname: yup.string().required().min(2).max(10),
});

export default function ProfileEdit({ user, isEdit }: ProfileEditProps) {
  const router = useRouter();
  const [prefix = "010", middle = "", last = ""] = user.phone?.split("-") ?? [];
  const [emailDomain, setEmailDomain] = useState(
    user.email?.split("@")[1] || "gmail.com",
  );
  console.log(user);

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
    resolver: yupResolver(editSchema),
    mode: "onTouched",
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
        postCode: user.address.postCode,
        detailAddress: user.address.detailAddress,
      },
      password: "",
      passwordConfirm: "",
      nickname: user.nickname,
    },
  });

  const onSubmit = async (data: ProfileEditFormType) => {
    const originalNickname = user.nickname;
    const isNicknameChanged = data.nickname !== originalNickname;

    if (isNicknameChanged && !data.nicknameChecked) {
      alert("닉네임 중복체크를 해주세요.");
      return;
    }

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
          nickname: data.nickname,
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

        router.refresh();
      } else {
        router.push("/mypage");
      }
    } catch (err) {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.inner}>
      <header>
        <h1>회원 정보 수정</h1>
      </header>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log("❌ validation 에러", errors);
        })}
      >
        <div className={styles.formInner}>
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
            register={register}
            errors={errors}
            setValue={setValue}
            clearErrors={clearErrors}
            watch={watch}
            getValues={getValues}
          />

          <AddressInput<ProfileEditFormType>
            control={control}
            errors={errors}
            isEdit={true}
          />

          <EmailInfo
            control={control}
            errors={errors}
            emailDomain={emailDomain}
            setEmailDomain={setEmailDomain}
            isEdit={true}
          />

          <BirthdayInput control={control} errors={errors} isEdit={true} />
        </div>

        {/*  회원가입 버튼 */}
        <Button type="submit" variant="black">
          수정하기
        </Button>
      </form>
    </div>
  );
}
