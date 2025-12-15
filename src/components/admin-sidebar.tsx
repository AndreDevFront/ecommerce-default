"use client";

import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { destroyCookie } from "nookies";

import styles from "./admin-sidebar.module.css";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Produtos", href: "/admin/products", icon: Package },
  { label: "Pedidos", href: "/admin/orders", icon: ShoppingBag },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    destroyCookie(null, "velas-token", { path: "/" });
    router.replace("/login");
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <span className={styles.logo}>
          Velas.co<span className={styles.logoSuffix}>Admin</span>
        </span>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navItem} ${
                    isActive ? styles.navItemActive : ""
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="pt-4 mt-4 border-t border-gray-100">
          <Link href="/" target="_blank" className={styles.navItem}>
            <ExternalLink className="mr-3 h-5 w-5" />
            Ver Loja Online
          </Link>
        </div>
      </nav>

      <div className={styles.footer}>
        <div className={styles.userProfile}>
          <div className={styles.avatarFallback}>AD</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Administrador</span>
            <span className={styles.userRole}>Gerente da Loja</span>
          </div>
        </div>

        <button onClick={handleLogout} className={styles.logoutButton}>
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
