"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import login from "@/assets/Image/header/mage_login.png";
import logout from "@/assets/Image/header/mage_logout.png";
import { Session } from "next-auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

  const onClickSignout = async () => {
    try {
      await signOut({
        redirect: false,
        callbackUrl: "/",
      });

      const cookiesToClear = [
        "next-auth.session-token",
        "__Secure-next-auth.session-token",
        "next-auth.csrf-token",
        "__Host-next-auth.csrf-token",
        "next-auth.callback-url",
        "__Secure-next-auth.callback-url",
      ];

      cookiesToClear.forEach((name) => {
        document.cookie = `${name}=; Max-Age=0; path=/;`;

        document.cookie = `${name}=; Max-Age=0; path=/; domain=localhost;`;

        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
      });

      toast.success(`로그아웃이 완료되었습니다`, {
        duration: 2000,
      });

      window.location.replace("/");
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
      toast.error("로그아웃에 실패했습니다.");
    }
  };

  if (isUserLoggedIn) {
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
