import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

import { CartSidebar } from "../cart/cart-sidebar";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Velas.co
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/products" className={styles.navLink}>
            Produtos
          </Link>
          <Link href="/about" className={styles.navLink}>
            Sobre
          </Link>
        </nav>

        <div className={styles.actions}>
          <CartSidebar />

          <Link href="/login">
            <Button variant="default" className="gap-2">
              <User className="h-4 w-4" />
              Entrar
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
