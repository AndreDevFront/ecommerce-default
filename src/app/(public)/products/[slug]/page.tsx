import { ChevronLeft, ShoppingCart, Truck } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { ProductDetailsResponse } from "@/types/product";
import styles from "./product.module.css";

import Image from "next/image";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string) {
  try {
    const response = await api(`/products/slug/${slug}`);

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Erro ao carregar produto");
    }

    const data: ProductDetailsResponse = await response.json();
    return data.product;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  return {
    title: product ? `${product.name} | Velas.co` : "Produto não encontrado",
    description: product?.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  return (
    <main className={styles.container}>
      <div className={styles.backLinkWrapper}>
        <Link href="/" className={styles.backLink}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar para a loja
        </Link>
      </div>

      <div className={styles.grid}>
        <div className={styles.imageWrapper}>
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              className={styles.image}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className={styles.noImage}>Sem Imagem</div>
          )}
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.price}>{formattedPrice}</div>

          <p className={styles.description}>{product.description}</p>

          {product.attributes && Object.keys(product.attributes).length > 0 && (
            <div>
              <h3 className={styles.attributesTitle}>Detalhes:</h3>
              <div className={styles.attributesGrid}>
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className={styles.attributeCard}>
                    <span className={styles.attrKey}>{key}</span>
                    <span className={styles.attrValue}>{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <Button size="lg" className={styles.addToCartBtn}>
              <ShoppingCart className="h-5 w-5" />
              Adicionar ao Carrinho
            </Button>

            <p className={styles.shippingInfo}>
              <Truck className="h-4 w-4" />
              Envio calculado no checkout
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
