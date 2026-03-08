import DashboardClientPage from "./page.client";

export const metadata = {
  title: "관리자 페이지 - 대시보드",
  description: "관리자페이지 대시보드입니다. 네게의 박스가있음.",
};

export default async function DashboardPage() {
  return <DashboardClientPage />;
}
