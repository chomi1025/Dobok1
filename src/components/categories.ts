// app/components/header/Header.server.tsx
import { getCategories } from "@/lib/category";
import HeaderClient from "./Header.client";

export const revalidate = 3600; //1시간 !

export default async function HeaderServer() {
  const { main, sub } = await getCategories();

  const grouped = main.map((m) => ({
    ...m,
    subs: sub.filter((s) => s.main_id === m.id),
  }));

  return <HeaderClient categories={grouped} />;
}
