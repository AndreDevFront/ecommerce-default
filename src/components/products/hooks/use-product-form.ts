import { api } from "@/lib/api";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Resolver, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { ProductFormData, productFormSchema } from "../product-form.schema";

interface UseProductFormProps {
  initialData?: Product;
}

export function useProductForm({ initialData }: UseProductFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(
      productFormSchema
    ) as unknown as Resolver<ProductFormData>,
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      price: Number(initialData?.price) || 0,
      stock: Number(initialData?.stock) || 0,
      attributes: {
        peso: initialData?.attributes?.peso || "",
        cor: initialData?.attributes?.cor || "",
        aroma: initialData?.attributes?.aroma || "",
      },

      images: initialData?.images || [],
    },
  });

  const { setValue, handleSubmit, reset, control } = form;

  const currentImages =
    useWatch({
      control,
      name: "images",
    }) || [];

  const nameValue = useWatch({ control, name: "name" });
  const slugValue = useWatch({ control, name: "slug" });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        slug: initialData.slug,
        description: initialData.description || "",
        price: Number(initialData.price),
        stock: Number(initialData.stock),
        attributes: {
          peso: initialData.attributes?.peso || "",
          cor: initialData.attributes?.cor || "",
          aroma: initialData.attributes?.aroma || "",
        },

        images: initialData.images || [],
      });
    }
  }, [initialData, reset]);

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const updatedImages = [...currentImages, ...files];
      setValue("images", updatedImages, { shouldDirty: true });
    }
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const updatedImages = currentImages.filter(
      (_: unknown, i: number) => i !== index
    );
    setValue("images", updatedImages, { shouldDirty: true });
  };

  useEffect(() => {
    if (!initialData && nameValue && !slugValue) {
      const slug = (nameValue || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
      setValue("slug", slug);
    }
  }, [nameValue, slugValue, initialData, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const uploadPromises = (data.images || []).map(async (item) => {
        if (item instanceof File) {
          const formData = new FormData();
          formData.append("file", item);

          const res = await api("/uploads", {
            method: "POST",
            body: formData,
          });

          if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            console.error("Erro detalhado do upload:", errorData);
            throw new Error(
              errorData.message || `Erro no upload: ${res.statusText}`
            );
          }
          const json = await res.json();
          return json.url || json.key;
        }

        return item;
      });

      const finalImages = await Promise.all(uploadPromises);

      const payload = {
        ...data,
        images: finalImages,
      };

      if (initialData) {
        await api(`/products/${initialData.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        toast.success("Produto atualizado!");
      } else {
        await api("/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        toast.success("Produto criado!");
      }

      await queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar produto.");
    }
  };

  return {
    form,
    images: currentImages,
    handleImageAdd,
    removeImage,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
    register: form.register,
  };
}
