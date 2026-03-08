"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import login from "@/assets/Image/header/mage_login.png";
import logout from "@/assets/Image/header/mage_logout.png";
import { Session } from "next-auth"; // 1. Session 타입 가져오기

interface Props {
  session: Session | null; // 2. 서버에서 넘겨받을 세션 타입 정의
}

export default function AuthIcons({ session }: Props) {
  // 3. 구조 분해 할당으로 받기
  // 4. useSession에서 'data'는 세션 정보고, 'status'는 로딩 상태야!
  const { data: clientSession, status } = useSession();

  // ⚡ 로딩 중에는 로그인 아이콘 그대로 보여주기
  if (status === "loading") {
    return (
      <Link href="/login">
        <Image src={login} alt="도복일번지 로그인" width={24} height={24} />
      </Link>
    );
  }

  // 5. 서버 세션이나 클라이언트 세션 중 하나라도 있으면 로그인 상태로 간주
  const isUserLoggedIn = !!session || !!clientSession;

  if (isUserLoggedIn) {
    return (
      <button
        type="button" // 버튼 타입 명시해주는 게 좋아
        onClick={() =>
          signOut({
            callbackUrl: "/",
          })
        }
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
