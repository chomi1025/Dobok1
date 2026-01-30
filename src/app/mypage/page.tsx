// app/mypage/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const session = await getServerSession(authOptions); //

  if (!session) redirect("/login"); // 세션 없으면 로그인 페이지
  redirect("/mypage/orders"); // 세션 있으면 기본 페이지
}
