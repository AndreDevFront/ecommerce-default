import { z } from "zod";

export const BannerItemSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.url("A imagem é obrigatória"),
  title: z.string().min(1, "O título é obrigatório"),
  subtitle: z.string().optional(),
  ctaText: z.string().min(1, "Texto do botão obrigatório"),
  ctaLink: z.string().min(1, "Link do botão obrigatório"),
});

export const StoreConfigFormSchema = z.object({
  banners: z
    .array(BannerItemSchema)
    .min(1, "A loja precisa de pelo menos 1 banner"),
});

export type StoreConfigFormData = z.infer<typeof StoreConfigFormSchema>;
