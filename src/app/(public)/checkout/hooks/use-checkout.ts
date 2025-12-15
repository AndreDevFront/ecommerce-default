import { useCartStore } from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { CheckoutFormData, checkoutSchema } from "../checkout.schema";

export function useCheckout() {
  const router = useRouter();
  const { items, total } = useCartStore();

  useEffect(() => {
    if (items.length === 0) {
      router.push("/");
    }
  }, [items, router]);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      document: "",
      address: {
        zipCode: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        complement: "",
      },
      paymentMethod: "card",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Dados validados:", data);
    console.log("Itens:", items);
    alert("Pedido enviado! Verifique o console.");
  };

  return {
    form,
    items,
    total,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
