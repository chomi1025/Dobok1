"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import login from "@/assets/Image/header/mage_login.png";
import logout from "@/assets/Image/header/mage_logout.png";
import { Session } from "next-auth";

interface Props {
  session: Session | null;
}

export default function AuthIcons({ session }: Props) {
  const { data: clientSession, status } = useSession();

  if (status === "loading") {
    return (
      <Link href="/login">
        <Image src={login} alt="도복일번지 로그인" width={24} height={24} />
      </Link>
    );
  }
  const isUserLoggedIn = !!session || !!clientSession;

  if (isUserLoggedIn) {
    return (
      <button
        type="button"
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
