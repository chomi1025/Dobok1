import { getCategories } from "@/lib/category";
import PageClient from "./page.client";

export default async function Page({
  params: { mainSlug, subSlug },
}: {
  params: { mainSlug: string; subSlug: string };
}) {
  const { grouped } = await getCategories();

  return <PageClient grouped={grouped} mainSlug={mainSlug} subSlug={subSlug} />;
}
