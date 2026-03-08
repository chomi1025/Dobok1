import MypageClientLayout from "./MypageClientLayout";

export const dynamic = "force-dynamic";

export default function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MypageClientLayout>{children}</MypageClientLayout>;
}
