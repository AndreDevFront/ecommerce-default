import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sobre Nós | Velas.co",
  description:
    "Conheça a essência e a história por trás das nossas velas artesanais.",
};

export default function About() {
  return (
    <>
      <main className={styles.mainContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.backLinkWrapper}>
            <Link href="/" className={styles.backLink}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Voltar para a loja
            </Link>
          </div>
          <header className={styles.header}>
            <h1 className={styles.title}>Nossa Essência</h1>
            <p className={styles.subtitle}>
              Iluminando lares e aquecendo corações.
            </p>
          </header>
          <section className={styles.content}>
            <p>
              Na <strong>Velas.co</strong>, acreditamos que uma vela é muito
              mais do que um objeto de decoração; é um convite para desacelerar.
              Nascemos da paixão por criar atmosferas acolhedoras e transformar
              momentos simples em memórias olfativas inesquecíveis.
            </p>
            <p>
              Cada uma de nossas velas é produzida artesanalmente, uma a uma,
              utilizando ceras vegetais sustentáveis e essências premium
              selecionadas a dedo. Nosso compromisso é entregar não apenas um
              produto, mas uma experiência de elegância e conforto para o seu
              lar.
            </p>
            <p>
              Seja para um jantar romântico, um banho relaxante ou apenas para
              ler um bom livro, queremos estar lá, iluminando seus melhores
              momentos.
            </p>

            <p className={styles.signature}>
              Obrigado por deixar a Velas.co fazer parte da sua história.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
