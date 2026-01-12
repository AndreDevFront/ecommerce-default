"use client";
import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/product";

import { useProductForm } from "./hooks/use-product-form";
import { ImageUpload } from "./image-upload";
import styles from "./product-form.module.css";

interface ProductFormProps {
  initialData?: Product;
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    errors,
    isSubmitting,
    preview,
    handleImageChange,
    removeImage,
  } = useProductForm({ initialData });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <h3 className={styles.sectionTitle}>Informações Básicas</h3>
        <div className={styles.gridTwoCols}>
          <div className={styles.field}>
            <label className={styles.label}>Nome do Produto</label>
            <Input
              placeholder="Ex: Vela Aromática Cloud"
              {...register("name")}
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Slug (URL)</label>
            <Input placeholder="vela-cloud" {...register("slug")} />
            {errors.slug && (
              <span className={styles.error}>{errors.slug.message}</span>
            )}
          </div>
        </div>

        <div className={`${styles.field} mt-4`}>
          <label className={styles.label}>Descrição</label>
          <Textarea
            placeholder="Descreva os detalhes da vela..."
            className="min-h-[100px]"
            {...register("description")}
          />
          {errors.description && (
            <span className={styles.error}>{errors.description.message}</span>
          )}
        </div>
      </div>

      <div>
        <h3 className={styles.sectionTitle}>Vendas</h3>
        <div className={styles.gridTwoCols}>
          <div className={styles.field}>
            <label className={styles.label}>Preço (R$)</label>
            <Input type="number" step="0.01" {...register("price")} />
            {errors.price && (
              <span className={styles.error}>{errors.price.message}</span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Estoque (Unidades)</label>
            <Input type="text" {...register("stock")} />
            {errors.stock && (
              <span className={styles.error}>{errors.stock.message}</span>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className={styles.sectionTitle}>Atributos da Vela</h3>
        <div className={styles.gridThreeCols}>
          <div className={styles.field}>
            <label className={styles.label}>Peso</label>
            <Input placeholder="Ex: 200g" {...register("attributes.peso")} />
            {errors.attributes?.peso && (
              <span className={styles.error}>
                {errors.attributes.peso.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Cor</label>
            <Input placeholder="Ex: Branca" {...register("attributes.cor")} />
            {errors.attributes?.cor && (
              <span className={styles.error}>
                {errors.attributes.cor.message}
              </span>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Aroma</label>
            <Input
              placeholder="Ex: Baunilha"
              {...register("attributes.aroma")}
            />
            {errors.attributes?.aroma && (
              <span className={styles.error}>
                {errors.attributes.aroma.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <ImageUpload
        preview={preview}
        onImageChange={handleImageChange}
        onRemove={removeImage}
      />

      <div className={styles.actions}>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="min-w-[150px] cursor-pointer"
        >
          {isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {initialData ? "Atualizar Produto" : "Salvar Produto"}
        </Button>
      </div>
    </form>
  );
}
