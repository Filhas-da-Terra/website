'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Leaf } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface ProjectSection {
  id: number
  title: string
  content: string
  imageUrl: string | null
  order: number
}

interface Project {
  id: number
  title: string
  description: string
  imageUrl: string | null
  slug: string
  sections?: ProjectSection[]
}

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projetos/${slug}`)
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Projeto não encontrado')
          }
          throw new Error('Falha ao carregar projeto')
        }
        const data: Project = await res.json()
        setProject(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [slug])

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <p>Carregando projeto...</p>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-6'>
          <Link
            href='/projetos'
            className='inline-flex items-center gap-2 text-green-700 dark:text-green-400 hover:underline'
          >
            <ArrowLeft className='w-4 h-4' />
            Voltar para Projetos
          </Link>
        </div>
        <p className='text-red-500'>{error || 'Projeto não encontrado'}</p>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Breadcrumb */}
      <div className='mb-6'>
        <Link
          href='/projetos'
          className='inline-flex items-center gap-2 text-green-700 dark:text-green-400 hover:underline'
        >
          <ArrowLeft className='w-4 h-4' />
          Voltar para Projetos
        </Link>
      </div>

      {/* Project Header */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-green-800 dark:text-green-400 mb-4'>
          {project.title}
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
          {project.description}
        </p>
      </div>

      {/* Project Content */}
      <div className='max-w-4xl mx-auto space-y-8'>
        {/* Project Image */}
        {project.imageUrl && (
          <div className='rounded-2xl overflow-hidden shadow-lg'>
            <Image
              width={800}
              height={450}
              src={project.imageUrl}
              alt={project.title}
              className='w-full h-auto object-cover'
            />
          </div>
        )}

        {/* Project Sections */}
        {project.sections && project.sections.length > 0 ? (
          project.sections.map((section) => (
            <Card
              key={section.id}
              className='hover:shadow-lg transition-shadow duration-300'
            >
              <CardHeader>
                <CardTitle className='text-green-800 dark:text-green-400 flex items-center gap-2'>
                  <Leaf className='w-5 h-5' />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                {section.imageUrl && (
                  <div className='rounded-xl overflow-hidden'>
                    <Image
                      width={700}
                      height={400}
                      src={section.imageUrl}
                      alt={section.title}
                      className='w-full h-auto object-cover'
                    />
                  </div>
                )}
                <div
                  className='prose prose-green dark:prose-invert max-w-none'
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader>
              <CardTitle className='text-green-800 dark:text-green-400 flex items-center gap-2'>
                <Leaf className='w-5 h-5' />
                Sobre o Projeto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-700 dark:text-gray-300'>
                {project.description}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
