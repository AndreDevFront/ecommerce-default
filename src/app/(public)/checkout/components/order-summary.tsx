import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatters";
import { CartItem } from "@/lib/store"; // Certifique-se de exportar CartItem da store
import styles from "../checkout.module.css";

interface Props {
  items: CartItem[];
  total: number;
}

export function OrderSummary({ items, total }: Props) {
  return (
    <Card className={styles.summaryCard}>
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
      </CardHeader>
      <CardContent className={styles.cardContent}>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.id} className={styles.itemRow}>
              <span>
                {item.quantity}x {item.name}
              </span>
              <span className={styles.itemPrice}>
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <Separator />

        <div className={styles.totalRow}>
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>

        <Button type="submit" size="lg" className={styles.submitButton}>
          Confirmar Pedido
        </Button>
      </CardContent>
    </Card>
  );
}
