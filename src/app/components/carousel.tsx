'use client'
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const Imagens = [
  "/foto1.jpg",
  "/foto2.jpg",
  "/foto3.jpg",
  "/foto4.jpg",
]

export default function CarouselComponent() {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <Carousel plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]} className="w-full">
        <CarouselContent>
          {Imagens.map((src, index) => (
            <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <div className="relative w-full h-[300px]"> {/* Tamanho fixo aqui */}
                  <Image
                    src={src}
                    alt={`Imagem ${index + 1}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
