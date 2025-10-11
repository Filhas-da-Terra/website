import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const contents = await prisma.content.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(contents)
  } catch (error) {
    console.error('Error fetching contents:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar conteúdos.' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const content = await prisma.content.create({ data })
    return NextResponse.json(content, { status: 201 })
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json(
      { error: 'Erro ao criar conteúdo.' },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'ID do conteúdo é obrigatório.' },
        { status: 400 },
      )
    }
    await prisma.content.delete({ where: { id: Number(id) } })
    return NextResponse.json(
      { message: 'Conteúdo deletado com sucesso.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error deleting content:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar conteúdo.' },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'ID do conteúdo é obrigatório.' },
        { status: 400 },
      )
    }
    const content = await prisma.content.update({
      where: { id: Number(id) },
      data,
    })
    return NextResponse.json(content)
  } catch (error) {
    console.error('Error updating content:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar conteúdo.' },
      { status: 500 },
    )
  }
}
