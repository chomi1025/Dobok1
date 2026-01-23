import { getCategories } from "@/lib/category";
import HeaderClient from "./Header.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export default async function HeaderServer() {
  const { grouped } = await getCategories();
  const session = await getServerSession(authOptions);
  console.log("현재 세션정보는:", session);

  return <HeaderClient categories={grouped} session={session} />;
}
