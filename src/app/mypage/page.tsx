// app/mypage/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const session = await getServerSession(authOptions); //

  if (!session) {
    redirect("/login");
  } else {
    redirect("/mypage/order");
  }
}
