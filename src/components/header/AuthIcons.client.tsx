"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import login from "@/assets/Image/header/mage_login.png";
import logout from "@/assets/Image/header/mage_logout.png";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { useRef, useState } from "react";

interface Props {
  session: Session | null;
}

export default function AuthIcons({ session }: Props) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const isSubmitting = useRef(false);

  const onClickSignout = async () => {
    if (isSubmitting.current) return;
    isSubmitting.current = true;
    setIsLoggingOut(true);

    const logoutToast = toast.loading("로그아웃 중입니다...");

    try {
      await signOut({
        redirect: false,
        callbackUrl: "/",
      });

      toast.dismiss(logoutToast);

      window.location.href = "/?logout=success";
    } catch (error) {
      console.error("로그아웃 에러:", error);
      toast.error("로그아웃 처리 중 오류가 발생했습니다.", { id: logoutToast });

      setIsLoggingOut(false);
      isSubmitting.current = false;
    }
  };

  if (session) {
    return (
      <button
        type="button"
        onClick={onClickSignout}
        disabled={isLoggingOut}
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
