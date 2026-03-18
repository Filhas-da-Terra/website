'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import Autoplay from 'embla-carousel-autoplay'

interface CarouselImage {
  url: string
  name: string
}

interface CarouselComponentProps {
  images: CarouselImage[]
}

export default function CarouselComponent({ images }: CarouselComponentProps) {
  const [lightboxImage, setLightboxImage] = useState<CarouselImage | null>(null)

  if (!images || images.length === 0) {
    return (
      <section className='py-16 px-6 max-w-6xl mx-auto'>
        <p className='text-center'>Carregando imagens...</p>
      </section>
    )
  }

  return (
    <section className='py-16 px-6 max-w-6xl mx-auto'>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className='w-full'
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className='basis-full md:basis-1/2 lg:basis-1/3'
            >
              <div className='p-1'>
                <button
                  type='button'
                  onClick={() => setLightboxImage(image)}
                  className='relative w-full h-[300px] block cursor-pointer rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#92400e] focus:ring-offset-2'
                >
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className='rounded-lg object-cover hover:opacity-95 transition-opacity'
                  />
                </button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden sm:flex' />
        <CarouselNext className='hidden sm:flex' />
      </Carousel>

      <Dialog
        open={!!lightboxImage}
        onOpenChange={(open) => !open && setLightboxImage(null)}
      >
        <DialogContent className='!max-w-[95vw] w-[90vw] max-h-[90vh] p-1 bg-black/95 border-none flex flex-col items-center justify-center'>
          <DialogTitle className='sr-only'>{lightboxImage?.name}</DialogTitle>
          {lightboxImage && (
            <div className='relative w-full h-[80vh] min-h-[300px]'>
              <Image
                src={lightboxImage.url}
                alt={lightboxImage.name}
                fill
                className='object-contain'
                sizes='90vw'
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
