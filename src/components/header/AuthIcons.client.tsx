"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { LogIn, LogOut } from "lucide-react";
import styles from "./Header.module.scss";
import { useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
}

export default function AuthIcons({ session }: Props) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const queryClient = useQueryClient();

  const onClickSignout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      queryClient.clear();

      await signOut({
        callbackUrl: "/",
      });

      toast.success("로그아웃 완료!");
    } catch (error) {
      console.error("로그아웃 에러:", error);
      toast.error("로그아웃에 실패했습니다.");
      setIsLoggingOut(false);
    }
  };

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
}
