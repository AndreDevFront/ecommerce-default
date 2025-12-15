import styles from "./dashboard.module.css";

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Visão Geral</h1>

      <div className={styles.welcomeCard}>
        <p className={styles.welcomeText}>
          Bem-vindo ao painel administrativo.
        </p>
        <p className={styles.instructionText}>
          Selecione uma opção no menu lateral para começar a gerenciar sua loja.
        </p>
      </div>
    </div>
  );
}
