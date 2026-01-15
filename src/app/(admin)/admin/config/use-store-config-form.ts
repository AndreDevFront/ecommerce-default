import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { StoreConfigFormSchema, type StoreConfigFormData } from "./schema";

export function useStoreConfigForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<StoreConfigFormData>({
    resolver: zodResolver(StoreConfigFormSchema),
    defaultValues: {
      banners: [],
    },
  });

  const { reset, control } = form;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "banners",
  });

  useEffect(() => {
    let isMounted = true;

    async function loadConfig() {
      try {
        const res = await api("/store-config");

        if (!res.ok) {
          if (isMounted) setIsLoading(false);
          return;
        }

        const data = await res.json();

        if (isMounted) {
          if (
            data.config &&
            data.config.banners &&
            data.config.banners.length > 0
          ) {
            reset({ banners: data.config.banners });
          } else {
            append({
              title: "",
              subtitle: "",
              imageUrl: "",
              ctaText: "Ver Oferta",
              ctaLink: "/produtos",
            });
          }
        }
      } catch (error) {
        console.error("Erro ao carregar configurações", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadConfig();

    return () => {
      isMounted = false;
    };
  }, [reset, append]);

  const handleImageUpload = async (file: File, index: number) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api("/uploads", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Falha no upload");

      const data = await res.json();
      form.setValue(`banners.${index}.imageUrl`, data.url);
    } catch (error) {
      console.error("Erro no upload:", error);
      toast.error("Erro ao enviar imagem.");
    }
  };

  const onSubmit = async (data: StoreConfigFormData) => {
    try {
      const res = await api("/store-config", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Falha ao salvar");

      toast.success("Loja atualizada com sucesso!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar configurações.");
    }
  };

  return {
    form,
    fields,
    append,
    remove,
    handleImageUpload,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    isLoading,
  };
}
