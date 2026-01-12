"use client";

import { useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";

import { cn } from "@/../lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!images || images.length === 0) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-xl bg-gray-100 text-gray-400">
        Sem imagem
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <InnerImageZoom
          key={selectedImage}
          src={selectedImage}
          zoomScale={2}
          zoomType="hover"
          hasSpacer={true}
          className="aspect-square w-full"
          imgAttributes={{
            alt: "Imagem do produto",
            className: "aspect-square w-full object-cover",
          }}
        />

        <div className="absolute top-2 right-2 rounded-full bg-white/80 px-2 py-1 text-[10px] font-medium text-gray-500 backdrop-blur-sm pointer-events-none z-10">
          Ampliar
        </div>
      </div>

      {images.length > 1 && (
        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full max-w-full"
        >
          <CarouselContent className="-ml-2">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-2 basis-1/4 min-w-0">
                <div
                  className={cn(
                    "cursor-pointer overflow-hidden rounded-lg border-2 transition-all aspect-square relative",
                    selectedImage === image
                      ? "border-blue-600 opacity-100 ring-2 ring-blue-100"
                      : "border-transparent opacity-60 hover:border-gray-300"
                  )}
                  onClick={() => setSelectedImage(image)}
                  onMouseEnter={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Thumb ${index}`}
                    className="h-full w-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden md:block">
            <CarouselPrevious className="-left-1 h-6 w-6" />
            <CarouselNext className="-right-1 h-6 w-6" />
          </div>
        </Carousel>
      )}
    </div>
  );
}
