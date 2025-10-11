'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Calendar, Clock, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function EventosPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-[#92400e] dark:text-orange-400 mb-4'>
          Eventos
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
          Participe dos nossos eventos e atividades que promovem justiça
          socioambiental e fortalecimento das comunidades.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <Card className='hover:shadow-lg transition-shadow duration-300 cursor-pointer group'>
          <Link href='/eventos/compostagem-hortas'>
            <CardHeader>
              <CardTitle className='text-[#92400e] dark:text-orange-400 group-hover:underline'>
                Oficina: Compostagem e Hortas Comunitárias
              </CardTitle>
              <CardDescription>
                Workshop sobre compostagem e fortalecimento de hortas
                comunitárias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3 mt-4'>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                  <Calendar className='w-4 h-4' />
                  <span>06 de novembro, 2025</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                  <Clock className='w-4 h-4' />
                  <span>14:30 - 17:15</span>
                </div>
              </div>
              <p className='mt-4 text-sm text-gray-700 dark:text-gray-300'>
                Oficina promovida pela Adasa com participação do Instituto
                Filhas da Terra sobre compostagem descentralizada e boas
                práticas agroecológicas.
              </p>
              <div className='mt-4 flex gap-2'>
                <span className='inline-flex items-center gap-2 px-3 py-2 bg-[#92400e] text-white rounded-lg text-sm'>
                  Ver Detalhes
                </span>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className='hover:shadow-lg transition-shadow duration-300 cursor-pointer group'>
          <Link href='/eventos/feira-sementes'>
            <CardHeader>
              <CardTitle className='text-[#92400e] dark:text-orange-400 group-hover:underline'>
                Feira de Sementes
              </CardTitle>
              <CardDescription>
                Troca e preservação de sementes tradicionais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3 mt-4'>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                  <Calendar className='w-4 h-4' />
                  <span>01 de novembro, 2025</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                  <Clock className='w-4 h-4' />
                  <span>09:00 - 17:00</span>
                </div>
              </div>
              <p className='mt-4 text-sm text-gray-700 dark:text-gray-300'>
                Feira especializada na troca e preservação de sementes
                tradicionais, promovendo a biodiversidade e a agricultura
                sustentável.
              </p>
              <div className='mt-4 flex gap-2'>
                <span className='inline-flex items-center gap-2 px-3 py-2 bg-[#92400e] text-white rounded-lg text-sm'>
                  Ver Detalhes
                </span>
                <a
                  href='https://www.instagram.com/p/DPjXBBegL7Z/?igsh=MTJ0MzU4N25mYnNo'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={(e) => e.stopPropagation()}
                  className='inline-flex items-center gap-2 px-3 py-2 border border-[#92400e] dark:border-orange-400 text-[#92400e] dark:text-orange-400 rounded-lg hover:bg-[#92400e] hover:text-white dark:hover:bg-orange-400 dark:hover:text-black transition-colors text-sm'
                >
                  <ExternalLink className='w-4 h-4' />
                  Instagram
                </a>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className='hover:shadow-lg transition-shadow duration-300 cursor-pointer group'>
          <Link href='/eventos/dia-das-criancas'>
            <CardHeader>
              <CardTitle className='text-[#92400e] dark:text-orange-400 group-hover:underline'>
                Dia das Crianças - Floresta da Nasaré
              </CardTitle>
              <CardDescription>
                Celebração especial para as crianças na natureza
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3 mt-4'>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                  <Calendar className='w-4 h-4' />
                  <span>19 de outubro, 2025</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                  <Clock className='w-4 h-4' />
                  <span>14:00</span>
                </div>
              </div>
              <p className='mt-4 text-sm text-gray-700 dark:text-gray-300'>
                Uma celebração especial do Dia das Crianças na Floresta da
                Nasaré, conectando os pequenos com a natureza e a preservação
                ambiental.
              </p>
              <div className='mt-4 flex gap-2'>
                <span className='inline-flex items-center gap-2 px-3 py-2 bg-[#92400e] text-white rounded-lg text-sm'>
                  Ver Detalhes
                </span>
                <a
                  href='https://www.instagram.com/p/DPUGF_jkQ4m/?igsh=bzNjZ3czdHZnaHZo'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={(e) => e.stopPropagation()}
                  className='inline-flex items-center gap-2 px-3 py-2 border border-[#92400e] dark:border-orange-400 text-[#92400e] dark:text-orange-400 rounded-lg hover:bg-[#92400e] hover:text-white dark:hover:bg-orange-400 dark:hover:text-black transition-colors text-sm'
                >
                  <ExternalLink className='w-4 h-4' />
                  Instagram
                </a>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className='hover:shadow-lg transition-shadow duration-300 cursor-pointer group'>
          <Link href='/eventos/mutirao-lagoinha'>
            <CardHeader>
              <CardTitle className='text-[#92400e] dark:text-orange-400 group-hover:underline'>
                Mutirão Lagoinha
              </CardTitle>
              <CardDescription>
                Ação comunitária de preservação e cuidado ambiental
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-3 mt-4'>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                  <Calendar className='w-4 h-4' />
                  <span>11 de outubro, 2025</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
                  <Clock className='w-4 h-4' />
                  <span>08:00</span>
                </div>
              </div>
              <p className='mt-4 text-sm text-gray-700 dark:text-gray-300'>
                Participe do mutirão comunitário para preservação e cuidado da
                Lagoinha. Uma ação coletiva em prol do meio ambiente.
              </p>
              <div className='mt-4 flex gap-2'>
                <span className='inline-flex items-center gap-2 px-3 py-2 bg-[#92400e] text-white rounded-lg text-sm'>
                  Ver Detalhes
                </span>
                <a
                  href='https://www.instagram.com/p/DPbeQLpgPEq/?igsh=Yjl0NjY3NGNpcGd5'
                  target='_blank'
                  rel='noopener noreferrer'
                  onClick={(e) => e.stopPropagation()}
                  className='inline-flex items-center gap-2 px-3 py-2 border border-[#92400e] dark:border-orange-400 text-[#92400e] dark:text-orange-400 rounded-lg hover:bg-[#92400e] hover:text-white dark:hover:bg-orange-400 dark:hover:text-black transition-colors text-sm'
                >
                  <ExternalLink className='w-4 h-4' />
                  Instagram
                </a>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  )
}
