import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    })
    if (!post || !post.published) {
      return NextResponse.json(
        { error: 'Post não encontrado.' },
        { status: 404 },
      )
    }
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar post do blog.' },
      { status: 500 },
    )
  }
}
