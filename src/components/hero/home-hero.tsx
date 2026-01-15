"use client";

import { useStoreConfig } from "@/hooks/use-store-config";
import { Image as ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { HeroBanner } from "./hero";

const FALLBACK_BANNER = {
  title: "Bem-vindo à Velas.co",
  subtitle: "Confira nossas ofertas imperdíveis e produtos exclusivos.",
  imageUrl: "/banner-home.jpg",
  ctaText: "Ver Produtos",
  ctaLink: "/produtos",
};

export function HomeHero() {
  const { data: config, isLoading } = useStoreConfig();
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = config?.banners || [];
  const hasMultipleBanners = banners.length > 1;

  useEffect(() => {
    if (!hasMultipleBanners) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [hasMultipleBanners, banners.length]);

  if (isLoading) {
    return (
      <div className="w-full h-[500px] md:h-[600px] bg-slate-100 animate-pulse flex flex-col items-center justify-center mt-10 mb-10 rounded-md">
        <ImageIcon className="w-12 h-12 text-slate-300 mb-4" />
        <span className="text-slate-400 font-medium">
          Carregando novidades...
        </span>
      </div>
    );
  }

  const currentBanner =
    banners.length > 0 ? banners[currentIndex] : FALLBACK_BANNER;

  return (
    <div className="relative group">
      <HeroBanner
        title={currentBanner.title}
        subtitle={currentBanner.subtitle || ""}
        backgroundImageUrl={currentBanner.imageUrl}
        ctaText={currentBanner.ctaText}
        ctaLink={currentBanner.ctaLink}
      />

      {hasMultipleBanners && (
        <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 z-30">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-white w-8"
                  : "bg-white/40 w-2 hover:bg-white/80"
              }`}
              aria-label={`Ir para banner ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
