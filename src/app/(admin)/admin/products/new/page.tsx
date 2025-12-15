import { ProductForm } from "@/components/products/product-form";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import styles from "./new-product.module.css";

export default function NewProductPage() {
  return (
    <div className={styles.container}>
      <div>
        <Link href="/admin/products" className={styles.backLink}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar para lista
        </Link>
      </div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Novo Produto</h1>
          <p className={styles.subtitle}>
            Preencha os dados para adicionar ao catálogo.
          </p>
        </div>
      </div>

      <ProductForm />
    </div>
  );
}
