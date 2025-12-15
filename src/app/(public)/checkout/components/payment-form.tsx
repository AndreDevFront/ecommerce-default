import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import styles from "../checkout.module.css";
import { CheckoutFormData } from "../checkout.schema";

interface Props {
  form: UseFormReturn<CheckoutFormData>;
}

export function PaymentForm({
  form: {
    setValue,
    formState: { errors },
  },
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          defaultValue="card"
          onValueChange={(val) =>
            setValue("paymentMethod", val as "card" | "pix")
          }
          className={styles.radioGroup}
        >
          <div className={styles.radioItem}>
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className={styles.radioLabel}>
              Cartão de Crédito
            </Label>
          </div>
          <div className={styles.radioItem}>
            <RadioGroupItem value="pix" id="pix" />
            <Label htmlFor="pix" className={styles.radioLabel}>
              PIX
            </Label>
          </div>
        </RadioGroup>
        {errors.paymentMethod && (
          <span className={styles.errorText}>
            {errors.paymentMethod.message}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
