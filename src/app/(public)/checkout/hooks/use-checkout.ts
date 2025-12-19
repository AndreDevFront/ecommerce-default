import { useCartStore } from "@/lib/store";
import { createOrder } from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CheckoutFormData, checkoutSchema } from "../checkout.schema";

export function useCheckout() {
  const router = useRouter();
  const { items, total } = useCartStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const [clientSecret, setClientSecret] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0 && !didSubmit) {
      router.push("/");
    }
  }, [items, router, didSubmit]);

  const resetPayment = () => {
    setClientSecret("");
    setOrderId("");
  };

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

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      setIsSubmitting(true);
      const result = await createOrder(data, items);

      if (result.payment?.clientSecret) {
        setClientSecret(result.payment.clientSecret);

        setOrderId(result.order.id);

        setDidSubmit(true);
      } else {
        toast.error("Erro ao gerar pagamento.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao realizar pedido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    items,
    total,
    isSubmitting,
    onSubmit: form.handleSubmit(onSubmit),
    clientSecret,
    orderId,
    resetPayment,
  };
}
