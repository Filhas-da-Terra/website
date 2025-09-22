'use client'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

interface CarouselImage {
  url: string
  name: string
}

interface CarouselComponentProps {
  images: CarouselImage[]
}

export default function CarouselComponent({ images }: CarouselComponentProps) {
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
                <div className='relative w-full h-[300px]'>
                  <Image
                    src={image.url}
                    alt={image.name}
                    fill
                    className='rounded-lg object-cover'
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='hidden sm:flex' />
        <CarouselNext className='hidden sm:flex' />
      </Carousel>
    </section>
  )
}
