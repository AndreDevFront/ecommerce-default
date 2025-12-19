import { CheckoutFormData } from "@/app/(public)/checkout/checkout.schema";
import { CartItem } from "@/lib/store";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export async function createOrder(data: CheckoutFormData, items: CartItem[]) {
  const payload = {
    ...data,

    items: items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
  };

  console.log("📡 Enviando pedido para:", `${API_URL}/orders`);

  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage =
      errorData.message || "Erro desconhecido ao criar pedido.";

    console.error("❌ Erro na API:", errorMessage);
    throw new Error(errorMessage);
  }

  return await response.json();
}
