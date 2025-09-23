import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(notices)
  } catch (error) {
    console.error('Erro ao buscar avisos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar avisos.' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const notice = await prisma.notice.create({ data })
    return NextResponse.json(notice, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar aviso:', error)
    return NextResponse.json({ error: 'Erro ao criar aviso.' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'ID do aviso é obrigatório.' },
        { status: 400 },
      )
    }
    const notice = await prisma.notice.update({
      where: { id: Number(id) },
      data,
    })
    return NextResponse.json(notice)
  } catch (error) {
    console.error('Erro ao atualizar aviso:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar aviso.' },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'ID do aviso é obrigatório.' },
        { status: 400 },
      )
    }
    await prisma.notice.delete({ where: { id: Number(id) } })
    return NextResponse.json({ message: 'Aviso deletado com sucesso.' })
  } catch (error) {
    console.error('Erro ao deletar aviso:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar aviso.' },
      { status: 500 },
    )
  }
}
