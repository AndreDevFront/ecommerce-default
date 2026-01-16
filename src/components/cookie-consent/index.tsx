"use client";

import { useEffect, useState } from "react";
import styles from "./cookie-consent.module.css";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const consent = localStorage.getItem("velas-cookie-consent");

      if (!consent) {
        setIsVisible(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("velas-cookie-consent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.text}>
            Ao navegar por este site{" "}
            <strong>você aceita o uso de cookies</strong> para agilizar a sua
            experiência de compra.
          </p>
        </div>
        <div className={styles.actions}>
          <button onClick={handleAccept} className={styles.button}>
            Aceitar e fechar
          </button>
        </div>
      </div>
    </div>
  );
}
