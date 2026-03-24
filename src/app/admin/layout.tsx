import AdminSidebar from "./component/sidebar";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { authOptions } from "@/lib/auth/options";
import { redirect } from "next/navigation";
import styles from "./page.module.scss";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className={styles.inner}>
      <AdminSidebar />

      {children}
    </div>
  );
}
