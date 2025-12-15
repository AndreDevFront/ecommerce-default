import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminSidebar } from "@/components/admin-sidebar";
import { ReactQueryProvider } from "@/providers/query-provider";
import styles from "./admin.module.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("velas-token");

  if (!token) {
    redirect("/login");
  }

  return (
    <ReactQueryProvider>
      <div className={styles.layoutContainer}>
        <AdminSidebar />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </ReactQueryProvider>
  );
}
