// app/components/header/Header.server.tsx
import { getCategories } from "@/lib/category";
import HeaderClient from "./Header.client";

export const revalidate = 3600; //1시간 !

export default async function HeaderServer() {
  const { grouped } = await getCategories();

  return <HeaderClient categories={grouped} />;
}
