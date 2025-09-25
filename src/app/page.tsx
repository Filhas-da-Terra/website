'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Logo from '@/components/ui/logo'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Lightbulb, HeartHandshake, Leaf, Users, Computer } from 'lucide-react'
import CarouselComponent from '@/components/ui/carouselComponent'
import { useEffect, useState } from 'react'
import type { CarouselImage, PublicAlert } from '@/types'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [images, setImages] = useState<CarouselImage[]>([])
  const [alert, setAlert] = useState<PublicAlert | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    setMounted(true)
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/carousel')
        if (res.ok) {
          const data = await res.json()
          setImages(data)
        }
      } catch (error) {
        console.error('Failed to fetch images:', error)
      }
    }
    const fetchAlert = async () => {
      try {
        const res = await fetch('/api/alerts/active', { cache: 'no-store' })
        if (res.ok) {
          const data = await res.json()
          if (data) {
            setAlert({
              title: data.title,
              message: data.message,
              imageUrl: data.imageUrl,
              videoUrl: data.videoUrl,
              linkUrl: data.linkUrl,
              linkLabel: data.linkLabel,
            })
            setShowAlert(true)
          }
        }
      } catch (error) {
        console.error('Failed to fetch alert:', error)
      }
    }
    fetchImages()
    fetchAlert()
  }, [])

  // Logo is now handled by the Logo component
  return (
    <main className='bg-[#F2F2F2] dark:bg-black text-[#111827] dark:text-white'>
      {/* HERO */}
      <section className='relative w-full h-[80vh] flex items-center justify-center bg-black'>
        <Image
          src='https://nkualykoqttmxfbhydav.supabase.co/storage/v1/object/public/filhasDaTerra/hero.jpg'
          alt='Instituto Filhas da Terra'
          fill
          style={{ objectFit: 'cover' }}
          className='opacity-40'
          priority
        />
        <div className='z-10 text-center px-4 max-w-2xl'>
          <h1 className='text-4xl md:text-6xl animate-fade-down animate-duration-1000 font-bold text-white drop-shadow-xl'>
            Justiça socioambiental nas periferias do DF
          </h1>
          <p className='text-lg mt-4 text-white drop-shadow animate-fade-down animate-duration-1000 animate-delay-[500ms]'>
            Atuamos em Ceilândia e Sol Nascente por meio de ações culturais,
            educativas e comunitárias
          </p>
          <Link href='/sobre'>
            <Button
              className='mt-6 text-base bg-white hover:bg-gray-200 cursor-pointer p-4 text-[#2E4D3D]'
              style={{ fontSize: '18px' }}
            >
              Conheça mais
            </Button>
          </Link>
        </div>
      </section>

      {/* VALORES */}
      <section className='py-16 px-6 max-w-6xl mx-auto'>
        <h2 className='text-3xl font-bold mb-10 text-center'>Nossos Valores</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card>
            <CardContent className='p-6 flex flex-col items-center text-center'>
              <HeartHandshake className='w-10 h-10 text-[#792F57] mb-4' />
              <h3 className='text-xl font-semibold mb-2'>Equidade</h3>
              <p>
                Valorizamos práticas que promovem justiça social, racial e
                ambiental.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-6 flex flex-col items-center text-center'>
              <Lightbulb className='w-10 h-10 text-[#F5C518] mb-4' />
              <h3 className='text-xl font-semibold mb-2'>Criatividade</h3>
              <p>
                Transformamos territórios por meio da cultura, arte e inovação
                popular.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className='p-6 flex flex-col items-center text-center'>
              <Users className='w-10 h-10 text-[#2E4D3D] mb-4' />
              <h3 className='text-xl font-semibold mb-2'>Coletividade</h3>
              <p>
                Nossa força vem das redes que construímos com os territórios.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <CarouselComponent images={images} />

      {/* ÁREAS DE ATUAÇÃO */}
      <section className='py-16 px-6 bg-white dark:bg-black'>
        <h2 className='text-3xl font-bold mb-10 text-center'>
          Áreas de Atuação
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto'>
          {[
            {
              icon: <Leaf className='text-green-700' />,
              title: 'Meio Ambiente',
            },
            {
              icon: <HeartHandshake className='text-[#792F57]' />,
              title: 'Saúde e Bem-estar',
            },
            {
              icon: <Lightbulb className='text-yellow-500' />,
              title: 'Cultura e Artes',
            },
            {
              icon: <Users className='text-indigo-600' />,
              title: 'Economia Solidária',
            },
            {
              icon: <Lightbulb className='text-purple-600' />,
              title: 'Educação e Formação',
            },
            {
              icon: <Computer className='text-rose-600' />,
              title: 'Ciência e Tecnologia',
            },
          ].map((area, i) => (
            <Card key={i}>
              <CardContent className='p-6 flex flex-col items-center text-center'>
                <div className='w-10 h-10 mb-4'>{area.icon}</div>
                <h3 className='text-lg font-semibold'>{area.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      {mounted && (
        <section className='relative w-full mb-6 h-[80vh] flex items-center justify-center bg-white dark:bg-black'>
          <Logo width={500} height={500} />
        </section>
      )}
      {/* CTA */}
      <section className='py-16 px-6 bg-[#2E4D3D] text-white text-center'>
        <h2 className='text-3xl font-bold mb-4'>
          Vamos juntas transformar o mundo!
        </h2>
        <p className='mb-6'>
          Participe de nossas ações ou entre em contato com a equipe do
          Instituto.
        </p>
        <Link href='/contatos'>
          <Button
            variant='secondary'
            className='text-[#2E4D3D] bg-white hover:bg-gray-200 cursor-pointer p-4'
            style={{ fontSize: '18px' }}
          >
            Fale conosco
          </Button>
        </Link>
      </section>

      {/* Alert Popup */}
      <Dialog open={showAlert} onOpenChange={setShowAlert}>
        <DialogContent className='sm:max-w-[480px]'>
          <DialogHeader>
            <DialogTitle>{alert?.title || 'Aviso'}</DialogTitle>
          </DialogHeader>
          <div className='space-y-3'>
            {alert?.imageUrl && (
              <Image
                src={alert.imageUrl}
                alt={alert.title}
                className='w-full rounded-md'
                width={800}
                height={450}
              />
            )}
            {alert?.videoUrl && (
              <video controls className='w-full rounded-md'>
                <source src={alert.videoUrl} />
              </video>
            )}
            <div className='whitespace-pre-wrap'>{alert?.message}</div>
            {alert?.linkUrl && (
              <a
                href={alert.linkUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center text-blue-600 underline'
              >
                {alert.linkLabel || 'Saiba mais'}
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
