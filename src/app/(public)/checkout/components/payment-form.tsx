import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller, UseFormReturn } from "react-hook-form";
import styles from "../checkout.module.css";
import { CheckoutFormData } from "../checkout.schema";

interface Props {
  form: UseFormReturn<CheckoutFormData>;
}

export function PaymentForm({ form }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pagamento</CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <RadioGroup
              onValueChange={(val) => {
                console.log("🖱️ Cliquei em:", val);
                field.onChange(val);
              }}
              value={field.value}
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
          )}
        />
        {form.formState.errors.paymentMethod && (
          <span className={styles.errorText}>
            {form.formState.errors.paymentMethod.message}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
