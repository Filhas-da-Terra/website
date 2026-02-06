import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const data = await request.json()

    const section = await prisma.projectSection.update({
      where: { id: Number(id) },
      data,
    })

    return NextResponse.json(section)
  } catch (error) {
    console.error('Error updating section:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar seção.' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    await prisma.projectSection.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({ message: 'Seção deletada com sucesso.' })
  } catch (error) {
    console.error('Error deleting section:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar seção.' },
      { status: 500 },
    )
  }
}
