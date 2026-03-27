"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import login from "@/assets/Image/header/mage_login.png";
import logout from "@/assets/Image/header/mage_logout.png";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { useState } from "react";

export default function AuthIcons() {
  const { data: session, status } = useSession();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onClickSignout = async () => {
    if (isLoggingOut) return;
    try {
      setIsLoggingOut(true);
      const data = await signOut({
        redirect: false,
        callbackUrl: "/",
      });

      toast.success("로그아웃이 완료되었습니다!\n메인화면으로 이동합니다.", {
        duration: 2000,
        style: {
          whiteSpace: "pre-line",
          textAlign: "center",
        },
      });

      setTimeout(() => {
        window.location.href = data?.url || "/";
      }, 1500);
    } catch (error) {
      console.error("로그아웃 에러:", error);
      toast.error("로그아웃에 실패했습니다.");
      setIsLoggingOut(false);
    }
  };

  if (status === "loading") {
    return (
      <div style={{ width: 24, height: 24, opacity: 0.3 }}>
        <Image src={login} alt="확인 중" width={24} height={24} priority />
      </div>
    );
  }

  // 로그인
  if (session) {
    return (
      <button
        type="button"
        onClick={onClickSignout}
        disabled={isLoggingOut}
        style={{
          opacity: isLoggingOut ? 0.5 : 1,
          cursor: isLoggingOut ? "not-allowed" : "pointer",
          border: "none",
          background: "none",
          padding: 0,
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

  // 비로그인
  return (
    <Link href="/login" prefetch={false}>
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
