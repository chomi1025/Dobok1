"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import styles from "./Header.module.scss";

const AuthIcons = () => {
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

  // 로딩 중
  if (status === "loading") {
    return (
      <div className={`${styles.authIconWrapper} ${styles.loading}`}>
        <LogIn size={24} />
        <p>로그인</p>
      </div>
    );
  }

  // 로그인 된 상태
  if (session) {
    return (
      <button
        type="button"
        onClick={onClickSignout}
        disabled={isLoggingOut}
        className={isLoggingOut ? styles.loading : ""}
      >
        <LogOut size={24} />
        <p>로그아웃</p>
      </button>
    );
  }

  // 비로그인 상태
  return (
    <Link href="/login" prefetch={false}>
      <LogIn size={24} />
      <p>로그인</p>
    </Link>
  );
};

export default React.memo(AuthIcons);
