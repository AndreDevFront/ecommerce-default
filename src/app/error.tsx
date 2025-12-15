"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    toast.error("Ops! Não conseguimos carregar os produtos.", {
      description: "Verifique sua conexão ou tente novamente mais tarde.",
      action: {
        label: "Tentar de novo",
        onClick: () => reset(),
      },
    });
  }, [error, reset]);

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <h2 className="text-xl font-bold text-gray-900">
          Algo deu errado na loja
        </h2>
        <p className="text-gray-500 max-w-md">
          Não foi possível carregar a vitrine de velas. Nossos servidores podem
          estar tirando um cochilo.
        </p>
      </div>

      <Button onClick={() => reset()} variant="outline">
        Tentar novamente
      </Button>
    </div>
  );
}
