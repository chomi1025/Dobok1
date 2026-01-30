import { getCategories } from "@/lib/category";
import HeaderClient from "./Header.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export default async function HeaderServer() {
  const { grouped } = await getCategories();
  const session = await getServerSession(authOptions);

  return <HeaderClient categories={grouped} session={session} />;
}
