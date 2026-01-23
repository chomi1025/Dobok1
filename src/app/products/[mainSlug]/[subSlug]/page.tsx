import { getCategories } from "@/lib/category";
import PageClient from "./page.client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";

export default async function Page({
  params: { mainSlug, subSlug },
}: {
  params: { mainSlug: string; subSlug: string };
}) {
  const { grouped } = await getCategories();

  return <PageClient grouped={grouped} mainSlug={mainSlug} subSlug={subSlug} />;
}
