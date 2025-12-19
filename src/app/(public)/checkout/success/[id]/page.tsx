import { ClearCartEffect } from "@/components/ClearCartEffect";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

interface SuccessProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SuccessPage(props: SuccessProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const { id } = params;
  const redirectStatus = searchParams.redirect_status;

  const displayId = id ? id.slice(0, 8) : "...";

  if (redirectStatus === "failed") {
    return (
      <main className={styles.container}>
        <div className={`${styles.iconWrapper} ${styles.errorWrapper}`}>
          <XCircle className={styles.icon} />
        </div>

        <h1 className={styles.title}>Pagamento não aprovado</h1>

        <p className={styles.description}>
          Infelizmente houve um erro ao processar o pagamento do pedido{" "}
          <span className={styles.orderId}>#{displayId}</span>.
        </p>

        <div className={styles.actions}>
          <Link href="/checkout">
            <Button size="lg" variant="destructive">
              Tentar Novamente
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  if (redirectStatus === "processing") {
    return (
      <main className={styles.container}>
        <div className={`${styles.iconWrapper} bg-blue-100 text-blue-600`}>
          <Loader2 className={`${styles.icon} animate-spin`} />
        </div>
        <h1 className={styles.title}>Processando Pagamento...</h1>
        <p className={styles.description}>
          Aguarde um momento enquanto confirmamos sua transação.
        </p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <ClearCartEffect />

      <div className={`${styles.iconWrapper} ${styles.successWrapper}`}>
        <CheckCircle className={styles.icon} />
      </div>

      <h1 className={styles.title}>Pedido Confirmado!</h1>

      <p className={styles.description}>
        Obrigado pela sua compra. Seu pedido{" "}
        <span className={styles.orderId}>#{displayId}</span> foi recebido e já
        estamos preparando suas velas.
      </p>

      <div className={styles.actions}>
        <Link href="/">
          <Button size="lg">Voltar para a Loja</Button>
        </Link>
      </div>
    </main>
  );
}
