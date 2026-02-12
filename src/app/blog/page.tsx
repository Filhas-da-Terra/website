'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FileText } from 'lucide-react'
import type { BlogPost } from '@/types'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog?published=true')
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

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

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800'>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8'>
          <div className='flex items-center gap-3 mb-4'>
            <FileText className='w-8 h-8 text-[#92400e] dark:text-orange-400' />
            <h1 className='text-4xl md:text-5xl font-bold text-[#92400e] dark:text-orange-400'>
              Blog
            </h1>
          </div>
          <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl'>
            Notícias, reflexões e novidades do Instituto Filhas da Terra.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className='text-center py-16'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4'>
              <FileText className='w-10 h-10 text-gray-400 dark:text-gray-600' />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2'>
              Nenhum post ainda
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              Em breve teremos novidades por aqui.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {posts.map((post) => (
              <Card
                key={post.id}
                className='group overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#92400e] dark:hover:border-orange-400 pt-0'
              >
                <Link href={`/blog/${post.slug}`}>
                  {post.imageUrl ? (
                    <div className='relative h-64 w-full overflow-hidden bg-gray-200 dark:bg-gray-700'>
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-300'
                      />
                    </div>
                  ) : (
                    <div className='h-64 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center'>
                      <FileText className='w-16 h-16 text-gray-300 dark:text-gray-600' />
                    </div>
                  )}
                  <CardHeader className='mt-4'>
                    <CardTitle className='text-lg text-gray-900 dark:text-gray-100 group-hover:text-[#92400e] dark:group-hover:text-orange-400 transition-colors line-clamp-2'>
                      {post.title}
                    </CardTitle>
                    <CardDescription className='text-sm line-clamp-2'>
                      {post.excerpt}
                    </CardDescription>
                    <div className='flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-500 dark:text-gray-400'>
                      {(post.author || post.authorImageUrl) && (
                        <span className='flex items-center gap-1.5'>
                          {post.authorImageUrl && (
                            <span className='relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700'>
                              <Image
                                src={post.authorImageUrl}
                                alt={post.author || 'Autor'}
                                fill
                                className='object-cover'
                              />
                            </span>
                          )}
                          {post.author && <span>Por {post.author}</span>}
                        </span>
                      )}
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <span className='inline-flex items-center gap-2 px-4 py-2 mt-4 bg-[#92400e] text-white rounded-lg text-sm font-medium hover:bg-[#78350f] transition-colors'>
                      Ler mais
                    </span>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
