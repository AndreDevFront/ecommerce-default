import { z } from "zod";

const paymentMethodEnum = z.enum(["card", "pix"], {
  message: "Selecione uma forma de pagamento",
});

export const checkoutSchema = z.object({
  name: z.string().min(3, "Por favor, digite seu nome completo"),
  email: z.email("Digite um e-mail válido"),
  document: z.string().optional(),

  address: z.object({
    zipCode: z.string().min(8, "CEP inválido"),
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z.string().length(2, "UF inválida"),
  }),
  paymentMethod: paymentMethodEnum,
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export type PaymentMethod = z.infer<typeof paymentMethodEnum>;
