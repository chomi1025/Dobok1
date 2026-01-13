"use client";
export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { mainSlug: string };
}) {
  return <>{children}</>;
}
