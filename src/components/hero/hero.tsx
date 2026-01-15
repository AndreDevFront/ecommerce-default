import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./hero.module.css";

interface HeroBannerProps {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
  ctaText: string;
  ctaLink: string;
}

export function HeroBanner({
  title,
  subtitle,
  backgroundImageUrl,
  ctaText,
  ctaLink,
}: HeroBannerProps) {
  return (
    <section className={styles.hero}>
      <Image
        src={backgroundImageUrl}
        alt="Banner principal"
        fill
        className={styles.heroImage}
        priority
        quality={90}
      />

      <div className={styles.overlay} />

      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>

        <Link href={ctaLink} className={styles.button}>
          {ctaText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
