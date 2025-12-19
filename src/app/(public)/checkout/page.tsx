"use client";

import { PaymentModal } from "@/components/PaymentModal";
import styles from "./checkout.module.css";
import { AddressForm } from "./components/address-form";
import { OrderSummary } from "./components/order-summary";
import { PaymentForm } from "./components/payment-form";
import { PersonalDataForm } from "./components/personal-data-form";
import { useCheckout } from "./hooks/use-checkout";

export default function CheckoutPage() {
  const {
    form,
    items,
    total,
    onSubmit,
    isSubmitting,
    clientSecret,
    orderId,
    resetPayment,
  } = useCheckout();

  const isModalOpen = !!clientSecret;

  if (items.length === 0) return null;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Finalizar Compra</h1>

      <form onSubmit={onSubmit} className={styles.formGrid}>
        <div className={styles.formColumn}>
          <PersonalDataForm form={form} />
          <AddressForm form={form} />
          <PaymentForm form={form} />
        </div>

        <div className={styles.summaryColumn}>
          <OrderSummary
            items={items}
            total={total()}
            isSubmitting={isSubmitting}
          />
        </div>
      </form>

      <PaymentModal
        isOpen={isModalOpen}
        clientSecret={clientSecret}
        orderId={orderId}
        onClose={(isOpen) => {
          if (!isOpen) resetPayment();
        }}
      />
    </main>
  );
}
