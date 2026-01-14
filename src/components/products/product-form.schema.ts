import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),

  slug: z
    .string()
    .min(1, "Slug é obrigatório")
    .regex(
      /^[a-z0-9-]+$/,
      "Use apenas letras minúsculas e hífens (ex: vela-azul)"
    ),

  description: z.string().min(5, "Descrição muito curta"),

  price: z.coerce.number().min(0.01, "Preço deve ser maior que zero"),

  stock: z.coerce.number().min(0, "Estoque não pode ser negativo"),

  attributes: z.object({
    peso: z.string().min(1, "Peso é obrigatório"),
    cor: z.string().min(1, "Cor é obrigatória"),
    aroma: z.string().min(1, "Aroma é obrigatório"),
  }),

  // imageFile: z.any().optional(),
  images: z.array(z.union([z.string(), z.instanceof(File)])).optional(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;
