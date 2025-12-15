import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import styles from "../checkout.module.css";
import { CheckoutFormData } from "../checkout.schema";

interface Props {
  form: UseFormReturn<CheckoutFormData>;
}

export function AddressForm({
  form: {
    register,
    formState: { errors },
  },
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Endereço de Entrega</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <div className={styles.twoCols}>
          <div className={styles.inputGroup}>
            <Label>CEP</Label>
            <Input placeholder="00000-000" {...register("address.zipCode")} />
            {errors.address?.zipCode && (
              <span className={styles.errorText}>
                {errors.address.zipCode.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles.streetGrid}>
          <div className={styles.inputGroup}>
            <Label>Rua</Label>
            <Input {...register("address.street")} />
            {errors.address?.street && (
              <span className={styles.errorText}>
                {errors.address.street.message}
              </span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <Label>Número</Label>
            <Input {...register("address.number")} />
            {errors.address?.number && (
              <span className={styles.errorText}>
                {errors.address.number.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles.twoCols}>
          <div className={styles.inputGroup}>
            <Label>Bairro</Label>
            <Input {...register("address.neighborhood")} />
            {errors.address?.neighborhood && (
              <span className={styles.errorText}>
                {errors.address.neighborhood.message}
              </span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <Label>Cidade</Label>
            <Input {...register("address.city")} />
            {errors.address?.city && (
              <span className={styles.errorText}>
                {errors.address.city.message}
              </span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <Label>Estado (UF)</Label>
            <Input
              placeholder="RS"
              maxLength={2}
              {...register("address.state")}
            />
            {errors.address?.state && (
              <span className={styles.errorText}>
                {errors.address.state.message}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
