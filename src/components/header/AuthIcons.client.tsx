"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import login from "@/assets/Image/header/mage_login.png";
import logout from "@/assets/Image/header/mage_logout.png";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { useState } from "react";

interface Props {
  session: Session | null;
}

export default function AuthIcons({ session }: Props) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onClickSignout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      const data = await signOut({
        redirect: false,
        callbackUrl: "/",
      });

      toast.success(`로그아웃이 완료되었습니다`, { duration: 2000 });

      setTimeout(() => {
        window.location.href = data.url || "/";
      }, 1500);
    } catch (error) {
      console.error("로그아웃 에러:", error);
      toast.error("로그아웃에 실패했습니다.");
      setIsLoggingOut(false);
    }
  };

  if (session) {
    return (
      <button
        type="button"
        onClick={onClickSignout}
        style={{
          opacity: isLoggingOut ? 0.5 : 1,
          cursor: isLoggingOut ? "not-allowed" : "pointer",
        }}
      >
        <Image
          src={logout}
          alt="도복일번지 로그아웃"
          width={24}
          height={24}
          priority
        />
      </button>
    );
  }

  return (
    <Link href="/login">
      <Image
        src={login}
        alt="도복일번지 로그인"
        width={24}
        height={24}
        priority
      />
    </Link>
  );
}
