import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publishedOnly = searchParams.get('published') === 'true'

    const posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
      ...(publishedOnly ? { where: { published: true } } : {}),
    })
    return NextResponse.json(posts)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    // Table might not exist yet (migration/db push not run)
    if (
      typeof message === 'string' &&
      (message.includes('does not exist') || message.includes('BlogPost'))
    ) {
      return NextResponse.json([])
    }
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      {
        error: 'Erro ao buscar posts do blog.',
        ...(process.env.NODE_ENV === 'development' && { detail: message }),
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const post = await prisma.blogPost.create({ data })
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json(
      { error: 'Erro ao criar post do blog.' },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'ID do post é obrigatório.' },
        { status: 400 },
      )
    }
    const post = await prisma.blogPost.update({
      where: { id: Number(id) },
      data,
    })
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar post do blog.' },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'ID do post é obrigatório.' },
        { status: 400 },
      )
    }
    await prisma.blogPost.delete({ where: { id: Number(id) } })
    return NextResponse.json(
      { message: 'Post deletado com sucesso.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar post do blog.' },
      { status: 500 },
    )
  }
}
