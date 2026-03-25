"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

function LogoutToastDetector() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const hasTriggered = useRef(false);

  useEffect(() => {
    const logoutStatus = searchParams.get("logout");
    const loginStatus = searchParams.get("login");

    if (!logoutStatus && !loginStatus) {
      hasTriggered.current = false;
      return;
    }

    if (hasTriggered.current) return;

    if (logoutStatus === "success") {
      hasTriggered.current = true;
      toast.success("로그아웃이 완료되었습니다.");

      router.replace("/");
    } else if (loginStatus === "success") {
      hasTriggered.current = true;
      toast.success("로그인이 완료되었습니다.");
      router.replace("/");
    }
  }, [searchParams, router]);

  return null;
}

export default function LogoutToastHandler() {
  return (
    <Suspense fallback={null}>
      <LogoutToastDetector />
    </Suspense>
  );
}
