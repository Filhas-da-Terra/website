'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  description: string
  imageUrl: string | null
  projectUrl: string | null
}

export default function ProjetosPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projetos')
        if (!res.ok) throw new Error('Falha ao carregar projetos')
        const data: Project[] = await res.json()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <main className='max-w-5xl mx-auto px-4 py-10 space-y-8'>
      <section>
        <h1 className='text-4xl font-bold text-green-800'>Nossos Projetos</h1>
        <p className='text-lg text-muted-foreground mt-2'>
          Conheça algumas das iniciativas desenvolvidas pelo Instituto Filhas da
          Terra para promover justiça socioambiental nas periferias do DF.
        </p>
      </section>

      <Separator />

      <section className='grid md:grid-cols-2 gap-6 animate-fade-down animate-duration-1000'>
        {loading && <p>Carregando projetos...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        {!loading &&
          !error &&
          projects.map((projeto) => (
            <Card key={projeto.id} className='rounded-2xl shadow-md'>
              {projeto.imageUrl && (
                <Image
                  width={500}
                  height={300}
                  src={projeto.imageUrl}
                  alt={projeto.title}
                  className='w-full h-48 object-cover rounded-t-2xl'
                />
              )}
              <CardContent className='p-6'>
                <h2 className='text-xl font-semibold text-green-700'>
                  {projeto.title}
                </h2>
                <p className='mt-2 text-muted-foreground'>
                  {projeto.description}
                </p>
              </CardContent>
            </Card>
          ))}
        {!loading && !error && projects.length === 0 && (
          <p>Nenhum projeto encontrado.</p>
        )}
      </section>

      <Separator />

      <section>
        <h2 className='text-2xl font-bold text-green-800'>Áreas de Atuação</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4'>
          {[
            'Ação Complementar à Escola',
            'Economia Solidária',
            'Formação Profissional',
            'Práticas Esportivas',
            'Promoção da Cultura',
            'Ciência e Tecnologia',
            'Comunicação',
            'Cultura e Artes',
            'Defesa de Direitos',
            'Desenvolvimento Comunitário',
            'Educação',
            'Esportes',
            'Formação para o Trabalho',
            'Meio Ambiente',
            'Saúde',
            'Educação Não Formal',
            'Qualidade de Vida',
          ].map((area, index) => (
            <span
              key={index}
              className='text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full text-center font-medium'
            >
              {area}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}
