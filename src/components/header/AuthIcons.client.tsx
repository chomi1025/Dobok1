// AuthIcons.client.tsx
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import login from "@/assets/Image/header/mage_login.png";
import logout from "@/assets/Image/header/mage_logout.png";
import { signOut } from "next-auth/react";

export default function AuthIcons() {
  const { data: session, status } = useSession();

  // ⚡ 로딩 중에는 로그인 아이콘 그대로 보여주기
  if (status === "loading") {
    return (
      <Link href="/login">
        <Image src={login} alt="도복일번지 로그인" width={24} height={24} />
      </Link>
    );
  }

  if (session) {
    return (
      <button
        onClick={() =>
          signOut({
            callbackUrl: "/", // 로그아웃 후 이동할 경로
          })
        }
      >
        <Image src={logout} alt="도복일번지 로그아웃" width={24} height={24} />
      </button>
    );
  }

  return (
    <Link href="/login">
      <Image src={login} alt="도복일번지 로그인" width={24} height={24} />
    </Link>
  );
}
