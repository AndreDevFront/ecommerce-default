import { ProductCard } from "@/components/product-card";
import { Product, ProductsResponse } from "@/types/product";

import { api } from "@/lib/api";
import styles from "./page.module.css";

async function getProducts(): Promise<Product[]> {
  const response = await api("/products", {
    cache: "no-cache",
    // next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error("Falha ao carregar produtos");
  }

  const json: ProductsResponse = await response.json();
  return json.data || [];
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Destaques da Loja</h1>
        <p className={styles.subtitle}>Confira nossas novidades fresquinhas.</p>

        <div className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className={styles.emptyState}>
            Nenhum produto encontrado. A loja está sendo abastecida! 🕯️
          </div>
        )}
      </div>
    </main>
  );
}
