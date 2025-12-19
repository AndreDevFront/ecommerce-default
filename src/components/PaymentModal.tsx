"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";

import styles from "./PaymentModal.module.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

interface PaymentModalProps {
  clientSecret: string;
  orderId: string;
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

function PaymentForm({
  onClose,
  orderId,
}: {
  onClose: () => void;
  orderId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log("Stripe ou Elements ainda não carregaram.");
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success/${orderId}`,
      },
    });

    if (error) {
      setMessage(error.message || "Erro no pagamento");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <PaymentElement />

      {message && <div className={styles.errorMessage}>{message}</div>}

      <div className={styles.buttonsContainer}>
        <button type="button" onClick={onClose} className={styles.cancelButton}>
          Cancelar
        </button>
        <button
          disabled={isLoading || !stripe || !elements}
          className={styles.submitButton}
        >
          {isLoading ? "Processando..." : "Pagar Agora"}
        </button>
      </div>
    </form>
  );
}

export function PaymentModal({
  clientSecret,
  orderId,
  isOpen,
  onClose,
}: PaymentModalProps) {
  if (!clientSecret) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle>Finalizar Pagamento</DialogTitle>
          <DialogDescription>
            Insira seus dados para concluir a compra de forma segura.
          </DialogDescription>
        </DialogHeader>

        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: { theme: "stripe" },
            loader: "auto",
          }}
        >
          <PaymentForm onClose={() => onClose(false)} orderId={orderId} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
