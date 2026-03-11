import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import BlogPostClient from './BlogPostClient'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug },
  })

  if (!post || !post.published) {
    return { title: 'Post não encontrado' }
  }

  const title = post.title
  const description = post.excerpt
  const imageUrl =
    post.imageUrl &&
    (post.imageUrl.startsWith('http') ? post.imageUrl : undefined)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageUrl && { images: [imageUrl] }),
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  return <BlogPostClient slug={slug} />
}
