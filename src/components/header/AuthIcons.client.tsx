"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import login from "@/assets/Image/header/mage_login.png";
import logout from "@/assets/Image/header/mage_logout.png";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  session: Session | null;
}

export default function AuthIcons({ session }: Props) {
  const { data: clientSession, status } = useSession();
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<Session | null>(
    session || clientSession,
  );

  if (status === "loading") {
    return (
      <Link href="/login">
        <Image src={login} alt="도복일번지 로그인" width={24} height={24} />
      </Link>
    );
  }

  const onClickSignout = async () => {
    await signOut({
      redirect: false,
      callbackUrl: "/",
    });

    setLoggedIn(null);

    router.push("");

    toast.success(`로그아웃이 완료되었습니다`, {
      duration: 2000,
    });
  };

  if (loggedIn) {
    return (
      <button type="button" onClick={onClickSignout}>
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
