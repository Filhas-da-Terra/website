'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  FileText,
  ExternalLink,
  Users,
  FileCheck,
  Globe,
  Music,
  AlertTriangle,
  Newspaper,
  LucideIcon,
  TrendingUp,
} from 'lucide-react'
import type { Content } from '@/types'
import Image from 'next/image'

const iconMap: Record<string, LucideIcon> = {
  FileText,
  Users,
  FileCheck,
  Globe,
  Music,
  AlertTriangle,
  Newspaper,
}

export default function ConteudosPage() {
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [contentItems, setContentItems] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await fetch('/api/conteudos')
        if (response.ok) {
          const data = await response.json()
          setContentItems(data)
        }
      } catch (error) {
        console.error('Error fetching contents:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContents()
  }, [])

  const categories = [
    'Todos',
    'Cadastro',
    'Petição',
    'Documento',
    'Portfólio',
    'Videoclipe',
    'Seminário',
    'Reportagem',
  ]

  const filteredItems =
    activeFilter === 'Todos'
      ? contentItems
      : contentItems.filter((item) => item.category === activeFilter)

  const featuredItems = filteredItems.filter((item) => item.featured)
  const regularItems = filteredItems.filter((item) => !item.featured)

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#92400e] border-t-transparent'></div>
          <p className='text-lg text-gray-600 dark:text-gray-300 mt-4'>
            Carregando conteúdos...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header Section */}
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-4'>
            <TrendingUp className='w-8 h-8 text-[#92400e] dark:text-orange-400' />
            <h1 className='text-4xl md:text-5xl font-bold text-[#92400e] dark:text-orange-400'>
              Conteúdos
            </h1>
          </div>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl'>
            Acesse publicações acadêmicas, reportagens, petições, vídeos,
            documentos e pesquisas produzidas pelo Instituto Filhas da Terra na
            luta por justiça socioambiental no Distrito Federal.
          </p>
        </div>

        {/* Category Filters */}
        <div className='mb-8 overflow-x-auto pb-2'>
          <div className='flex gap-3 min-w-max md:flex-wrap md:min-w-0'>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`cursor-pointer px-5 py-2.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                  activeFilter === category
                    ? 'bg-[#92400e] text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-[#92400e] dark:hover:border-orange-400 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Content Section */}
        {featuredItems.length > 0 && (
          <div className='mb-12'>
            <div className='flex items-center gap-2 mb-6'>
              <div className='h-1 w-12 bg-[#92400e] dark:bg-orange-400 rounded'></div>
              <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-100'>
                Destaques
              </h2>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
              {featuredItems.map((item) => {
                const IconComponent = iconMap[item.icon] || FileText
                return (
                  <Card
                    key={item.id}
                    className='group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#92400e] dark:hover:border-orange-400'
                  >
                    {item.imageUrl && (
                      <div className='relative h-64 w-full overflow-hidden bg-gray-200 dark:bg-gray-700'>
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className='object-cover group-hover:scale-110 transition-transform duration-300'
                        />
                        <div className='absolute top-4 left-4'>
                          <span className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#92400e] text-white text-sm font-medium rounded-full shadow-lg'>
                            <IconComponent className='w-4 h-4' />
                            {item.category}
                          </span>
                        </div>
                      </div>
                    )}
                    <CardHeader>
                      {!item.imageUrl && (
                        <div className='flex items-center gap-2 mb-2'>
                          <IconComponent className='w-5 h-5 text-[#92400e] dark:text-orange-400' />
                          <span className='text-sm font-medium text-[#92400e] dark:text-orange-400 uppercase tracking-wide'>
                            {item.category}
                          </span>
                        </div>
                      )}
                      <CardTitle className='text-2xl text-gray-900 dark:text-gray-100 group-hover:text-[#92400e] dark:group-hover:text-orange-400 transition-colors line-clamp-2'>
                        {item.title}
                      </CardTitle>
                      <CardDescription className='text-base line-clamp-2'>
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className='text-gray-700 dark:text-gray-300 mb-4 line-clamp-3'>
                        {item.content}
                      </p>
                      <a
                        href={item.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 px-5 py-2.5 bg-[#92400e] text-white rounded-lg hover:bg-[#78350f] transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg group/link'
                      >
                        {item.linkText}
                        <ExternalLink className='w-4 h-4 group-hover/link:translate-x-1 transition-transform' />
                      </a>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Regular Content Grid */}
        {regularItems.length > 0 && (
          <div>
            {featuredItems.length > 0 && (
              <div className='flex items-center gap-2 mb-6'>
                <div className='h-1 w-12 bg-gray-400 dark:bg-gray-600 rounded'></div>
                <h2 className='text-2xl font-bold text-gray-800 dark:text-gray-100'>
                  Mais Conteúdos
                </h2>
              </div>
            )}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {regularItems.map((item) => {
                const IconComponent = iconMap[item.icon] || FileText
                return (
                  <Card
                    key={item.id}
                    className='group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700 hover:border-[#92400e] dark:hover:border-orange-400'
                  >
                    {item.imageUrl && (
                      <div className='relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700'>
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          className='object-cover group-hover:scale-105 transition-transform duration-300'
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className='flex items-center gap-2 mb-2'>
                        <IconComponent className='w-4 h-4 text-[#92400e] dark:text-orange-400' />
                        <span className='text-xs font-medium text-[#92400e] dark:text-orange-400 uppercase tracking-wide'>
                          {item.category}
                        </span>
                      </div>
                      <CardTitle className='text-lg text-gray-900 dark:text-gray-100 group-hover:text-[#92400e] dark:group-hover:text-orange-400 transition-colors line-clamp-2'>
                        {item.title}
                      </CardTitle>
                      <CardDescription className='text-sm line-clamp-2'>
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2'>
                        {item.content}
                      </p>
                      <a
                        href={item.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-2 px-4 py-2 bg-[#92400e] text-white rounded-lg hover:bg-[#78350f] transition-all duration-200 text-sm font-medium shadow hover:shadow-lg group/link'
                      >
                        {item.linkText}
                        <ExternalLink className='w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform' />
                      </a>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className='text-center py-16'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4'>
              <Newspaper className='w-10 h-10 text-gray-400 dark:text-gray-600' />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2'>
              Nenhum conteúdo encontrado
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              Não há conteúdos na categoria &quot;{activeFilter}&quot; no
              momento.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
