"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import styles from "./login.module.css";

const loginSchema = z.object({
  email: z.email("Formato de e-mail inválido").min(1, "E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(data: LoginFormData) {
    try {
      const response = await api("/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const responseData = await response.json();

      setCookie(null, "velas-token", responseData.access_token, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      toast.success("Bem-vindo de volta!");

      router.push("/admin/dashboard");
    } catch (err) {
      toast.error("Falha no login. Verifique seus dados.", err || "");
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Velas.co Admin</h1>
          <p className={styles.subtitle}>Gerencie sua loja com segurança</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit(handleLogin)}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <Input
              id="email"
              placeholder="admin@velas.com"
              {...register("email")}
            />
            {errors.email && (
              <span className={styles.errorMessage}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <span className={styles.errorMessage}>
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : (
              "Entrar na Plataforma"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
