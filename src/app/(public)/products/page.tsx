import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

export default async function Products() {
  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className={styles.backLinkWrapper}>
        <Link href="/" className={styles.backLink}>
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar para a loja
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
      <p className="text-gray-500">
        Esse é o conteúdo público da loja. Aqui você pode ver os produtos
        disponíveis na loja.
      </p>
    </div>
  );
}
