import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import styles from "../checkout.module.css";
import { CheckoutFormData } from "../checkout.schema";

interface Props {
  form: UseFormReturn<CheckoutFormData>;
}

export function PersonalDataForm({
  form: {
    register,
    formState: { errors },
  },
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seus Dados</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <div className="grid grid-cols-1 gap-4">
          <div className={styles.inputGroup}>
            <Label>Nome Completo</Label>
            <Input placeholder="Ex: João da Silva" {...register("name")} />
            {errors.name && (
              <span className={styles.errorText}>{errors.name.message}</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <Label>E-mail</Label>
            <Input placeholder="seu@email.com" {...register("email")} />
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
