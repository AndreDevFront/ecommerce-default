"use client";

import {
  ImageIcon,
  Loader2,
  Plus,
  Save,
  Trash2,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";
import styles from "./config.module.css";
import { useStoreConfigForm } from "./use-store-config-form";

export default function StoreConfigPage() {
  const {
    form,
    fields,
    append,
    remove,
    handleImageUpload,
    onSubmit,
    isSubmitting,
    isLoading,
  } = useStoreConfigForm();

  if (isLoading) {
    return (
      <div className={styles.boxIsLoading}>
        <Loader2 className={styles.loader2} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Configuração da Loja</h1>
          <p className={styles.subtitle}>
            Gerencie os banners e a aparência da página inicial.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Banners da Home</h2>
          <button
            onClick={() =>
              append({
                title: "",
                subtitle: "",
                imageUrl: "",
                ctaText: "Ver Oferta",
                ctaLink: "/produtos",
              })
            }
            className={styles.addButton}
          >
            <Plus className="w-4 h-4" />
            Adicionar Banner
          </button>
        </div>

        <div className={styles.list}>
          {fields.map((field, index) => {
            const currentImageUrl = form.watch(`banners.${index}.imageUrl`);

            return (
              <div key={field.id} className={styles.card}>
                <button
                  onClick={() => remove(index)}
                  className={styles.removeButton}
                  title="Remover banner"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className={styles.cardGrid}>
                  <div className={styles.uploadCol}>
                    <label className={styles.label}>Imagem do Banner</label>

                    <div className={styles.uploadBox}>
                      {currentImageUrl ? (
                        <Image
                          src={currentImageUrl}
                          alt="Preview"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 30vw"
                          loading="eager"
                        />
                      ) : (
                        <div className={styles.emptyState}>
                          <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                          <span className="text-xs">Sem imagem</span>
                        </div>
                      )}

                      <input
                        type="file"
                        accept="image/*"
                        className={styles.fileInput}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, index);
                        }}
                      />

                      <div className={styles.uploadOverlay}>
                        <div className={styles.overlayContent}>
                          <UploadCloud className="w-6 h-6 mb-1" />
                          <span className="text-xs font-medium">
                            Trocar Imagem
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className={styles.helperText}>Recomendado: 1920x600px</p>

                    {form.formState.errors.banners?.[index]?.imageUrl && (
                      <span className={styles.errorText}>
                        {
                          form.formState.errors.banners?.[index]?.imageUrl
                            ?.message
                        }
                      </span>
                    )}
                  </div>

                  <div className={styles.formCol}>
                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Título Principal</label>
                      <input
                        {...form.register(`banners.${index}.title`)}
                        type="text"
                        placeholder="Ex: Promoção de Verão"
                        className={styles.input}
                      />
                      {form.formState.errors.banners?.[index]?.title && (
                        <span className={styles.errorText}>
                          {
                            form.formState.errors.banners?.[index]?.title
                              ?.message
                          }
                        </span>
                      )}
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.label}>Subtítulo</label>
                      <input
                        {...form.register(`banners.${index}.subtitle`)}
                        type="text"
                        placeholder="Ex: Descontos de até 50% em toda a loja"
                        className={styles.input}
                      />
                    </div>

                    <div className={styles.row}>
                      <div>
                        <label className={styles.label}>Texto do Botão</label>
                        <input
                          {...form.register(`banners.${index}.ctaText`)}
                          type="text"
                          placeholder="Ex: Comprar Agora"
                          className={styles.input}
                        />
                        {form.formState.errors.banners?.[index]?.ctaText && (
                          <span className={styles.errorText}>
                            {
                              form.formState.errors.banners?.[index]?.ctaText
                                ?.message
                            }
                          </span>
                        )}
                      </div>

                      <div>
                        <label className={styles.label}>Link de Destino</label>
                        <input
                          {...form.register(`banners.${index}.ctaLink`)}
                          type="text"
                          placeholder="Ex: /produtos/promocao"
                          className={styles.input}
                        />
                        {form.formState.errors.banners?.[index]?.ctaLink && (
                          <span className={styles.errorText}>
                            {
                              form.formState.errors.banners?.[index]?.ctaLink
                                ?.message
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {fields.length === 0 && (
            <div className={styles.emptyList}>
              <ImageIcon className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>Nenhum banner configurado.</p>
              <button
                onClick={() =>
                  append({
                    title: "",
                    subtitle: "",
                    imageUrl: "",
                    ctaText: "Ver Oferta",
                    ctaLink: "/produtos",
                  })
                }
                className="text-blue-600 font-medium hover:underline mt-2 cursor-pointer"
              >
                Clique para adicionar o primeiro
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className={styles.saveButton}
        >
          <Save className="w-4 h-4" />
          {isSubmitting ? "Salvando..." : "Salvar Alterações"}
        </button>
      </div>
    </div>
  );
}
