import { api } from "@/lib/api";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProductFormData, productFormSchema } from "../product-form.schema";

interface UseProductFormProps {
  initialData?: Product;
}

export function useProductForm({ initialData }: UseProductFormProps) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(
    initialData?.imageUrl || null
  );

  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      stock: initialData?.stock || 0,
      attributes: {
        peso: initialData?.attributes?.peso || "",
        cor: initialData?.attributes?.cor || "",
        aroma: initialData?.attributes?.aroma || "",
      },
    },
  });

  const { setValue, watch, handleSubmit } = form;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(file));
      setValue("imageFile", file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setValue("imageFile", null);
  };

  const nameValue = watch("name");
  const slugValue = watch("slug");

  useEffect(() => {
    if (!initialData && nameValue && !slugValue) {
      const slug = nameValue
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
      let finalImageUrl = initialData?.imageUrl || null;

      if (data.imageFile instanceof File) {
        const formData = new FormData();
        formData.append("file", data.imageFile);

        const uploadRes = await api("/uploads", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) throw new Error("Falha no upload");
        const uploadData = await uploadRes.json();
        finalImageUrl = uploadData.url || uploadData.key;
      }

      const payload = {
        ...data,
        image: finalImageUrl,
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

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar.");
    }
  };

  return {
    form,
    preview,
    handleImageChange,
    removeImage,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    errors: form.formState.errors,
    register: form.register,
  };
}
