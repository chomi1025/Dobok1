import { redirect } from "next/navigation";
import Sidebar from "./components/Sidebar";
import styles from "./page.module.scss";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";

export const dynamic = "force-dynamic";

export default async function MypageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className={styles.inner}>
      <Sidebar />

      {children}
    </div>
  );
}
