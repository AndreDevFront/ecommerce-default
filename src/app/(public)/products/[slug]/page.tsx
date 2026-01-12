import { ChevronLeft, Truck } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { api } from "@/lib/api";
import { ProductDetailsResponse } from "@/types/product";
import styles from "./product.module.css";

import { formatPrice } from "@/lib/formatters";

import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { ProductGallery } from "@/components/products/product-gallery";

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

  const productImages = [
    product.imageUrl ||
      "https://images.unsplash.com/photo-1761839257658-23502c67f6d5?w=800",
    "https://images.unsplash.com/photo-1767992225724-02410ec164e7?w=800",
    "https://images.unsplash.com/photo-1768158984380-5071c359070f?w=800",
    "https://images.unsplash.com/photo-1768195459732-1c760b8ec587?w=800",
    "https://images.unsplash.com/photo-1765840138769-a4c229d7f190?w=800",
  ];

  return (
    <main className={styles.container}>
      <div className={styles.backLinkWrapper}>
        <Link href="/" className={styles.backLink}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar para a loja
        </Link>
      </div>

      <div className={styles.grid}>
        <div className="w-full">
          <ProductGallery images={productImages} />
        </div>

        <div className={styles.info}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.price}>{formatPrice(product.price)}</div>

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
            <AddToCartButton
              product={product}
              className={styles.addToCartBtn}
            />

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
