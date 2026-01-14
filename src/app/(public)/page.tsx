export const dynamic = "force-dynamic";
import { ProductCard } from "@/components/product-card";
import { Product, ProductsResponse } from "@/types/product";

import { HeroBanner } from "@/components/hero/hero";
import { api } from "@/lib/api";
import styles from "./page.module.css";

async function getProducts(): Promise<Product[]> {
  try {
    const response = await api("/products", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Falha ao carregar produtos");
    }
    const json: ProductsResponse = await response.json();
    return json.data || [];
  } catch (error) {
    console.error("Falha crítica ao buscar produtos:", error);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Destaques da Loja</h1>
        <p className={styles.subtitle}>Confira nossas novidades fresquinhas.</p>

        <HeroBanner
          title="Ilumine seus momentos"
          subtitle="Descubra nossa coleção exclusiva de velas aromáticas artesanais. O toque perfeito de conforto e elegância para o seu lar."
          backgroundImageUrl="https://images.unsplash.com/photo-1602523772275-2292723c004d?q=80&w=1920&auto=format&fit=crop"
          ctaText="Ver Coleção"
          ctaLink="/produtos"
        />

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
