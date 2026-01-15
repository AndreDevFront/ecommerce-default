import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export interface BannerItem {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export interface StoreConfig {
  id: string;
  banners: BannerItem[];
}

async function fetchStoreConfig() {
  const response = await api("/store-config");

  if (!response.ok) {
    throw new Error("Erro ao carregar configurações da loja");
  }

  const data = await response.json();

  return data.config as StoreConfig;
}

export function useStoreConfig() {
  return useQuery({
    queryKey: ["store-config"],
    queryFn: fetchStoreConfig,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
