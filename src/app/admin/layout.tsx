import AdminSidebar from "./component/sidebar";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div
      style={{
        display: "flex",
        width: "1140px",
        minHeight: "100vh",
        margin: "0 auto",
        paddingTop: "80px",
      }}
    >
      <AdminSidebar />
      {children}
    </div>
  );
}
