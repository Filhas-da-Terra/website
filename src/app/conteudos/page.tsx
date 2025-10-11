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
} from 'lucide-react'
import type { Content } from '@/types'

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

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <p className='text-lg text-gray-600 dark:text-gray-300'>
            Carregando conteúdos...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-[#92400e] dark:text-orange-400 mb-4'>
          Conteúdos
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
          Acesse oficinas, vídeos, documentos, movimentos e campanhas do
          Instituto Filhas da Terra para justiça socioambiental no DF.
        </p>
      </div>

      {/* Filtros */}
      <div className='flex flex-wrap gap-4 mb-8 justify-center'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              activeFilter === category
                ? 'bg-[#92400e] text-white hover:bg-[#78350f]'
                : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredItems.map((item) => {
          const IconComponent = iconMap[item.icon] || FileText
          return (
            <Card
              key={item.id}
              className='hover:shadow-lg transition-shadow duration-300'
            >
              <CardHeader>
                <div className='flex items-center gap-2 mb-2'>
                  <IconComponent className='w-5 h-5 text-[#92400e] dark:text-orange-400' />
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {item.category}
                  </span>
                </div>
                <CardTitle className='text-[#92400e] dark:text-orange-400'>
                  {item.title}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-4'>
                  {item.content}
                </p>
                <div className='flex gap-2'>
                  <a
                    href={item.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 px-3 py-2 bg-[#92400e] text-white rounded-lg hover:bg-[#78350f] transition-colors text-sm cursor-pointer'
                  >
                    <ExternalLink className='w-4 h-4' />
                    {item.linkText}
                  </a>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Seção de Newsletter */}
      {/* <div className='mt-16'>
        <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center'>
          <h2 className='text-2xl font-bold text-[#92400e] dark:text-orange-400 mb-4'>
            Receba Novos Conteúdos
          </h2>
          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            Cadastre-se para receber notificações sobre novos materiais,
            relatórios e publicações.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto'>
            <input
              type='email'
              placeholder='Seu e-mail'
              className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#92400e] dark:focus:ring-orange-400'
            />
            <button className='px-6 py-2 bg-[#92400e] text-white rounded-lg hover:bg-[#78350f] transition-colors'>
              Cadastrar
            </button>
          </div>
        </div>
      </div> */}
    </div>
  )
}
