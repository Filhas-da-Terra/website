'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import type { BlogPost } from '@/types'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return

    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${encodeURIComponent(slug)}`)
        if (response.status === 404) {
          setNotFound(true)
          setPost(null)
          return
        }
        if (response.ok) {
          const data = await response.json()
          setPost(data)
        }
      } catch (error) {
        console.error('Error fetching post:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#92400e] border-t-transparent'></div>
          <p className='text-lg text-gray-600 dark:text-gray-300 mt-4'>
            Carregando...
          </p>
        </div>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className='container mx-auto px-4 py-16 text-center'>
        <h1 className='text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4'>
          Post não encontrado
        </h1>
        <Link
          href='/blog'
          className='inline-flex items-center gap-2 text-[#92400e] dark:text-orange-400 hover:underline'
        >
          <ArrowLeft className='w-4 h-4' />
          Voltar ao blog
        </Link>
      </div>
    )
  }

  return (
    <article className='min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto px-4 py-8 max-w-3xl'>
        <Link
          href='/blog'
          className='inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#92400e] dark:hover:text-orange-400 mb-8 transition-colors'
        >
          <ArrowLeft className='w-4 h-4' />
          Voltar ao blog
        </Link>

        {post.imageUrl && (
          <div className='relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 mb-8'>
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className='object-cover'
              priority
            />
          </div>
        )}

        <header className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
            {post.title}
          </h1>
          <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400'>
            {post.author && <span>Por {post.author}</span>}
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </header>

        {post.excerpt && (
          <p className='text-lg text-gray-700 dark:text-gray-300 mb-8 font-semibold'>
            {post.excerpt}
          </p>
        )}

        <div className='prose prose-lg dark:prose-invert max-w-none font-medium'>
          <div className='whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed'>
            {post.content}
          </div>
        </div>

        {(post.author || post.authorBio || post.authorImageUrl) && (
          <section className='mt-12 pt-8 border-t border-gray-200 dark:border-gray-700'>
            <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4'>
              Sobre o autor(a)
            </h2>
            <div className='flex flex-col sm:flex-row gap-4 items-start'>
              {post.authorImageUrl && (
                <div className='relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700'>
                  <Image
                    src={post.authorImageUrl}
                    alt={post.author || 'Autor'}
                    fill
                    className='object-cover'
                  />
                </div>
              )}
              <div>
                {post.author && (
                  <p className='font-medium text-gray-900 dark:text-gray-100'>
                    {post.author}
                  </p>
                )}
                {post.authorBio && (
                  <p className='text-gray-600 dark:text-gray-400 mt-1 whitespace-pre-wrap font-medium'>
                    {post.authorBio}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </article>
  )
}
