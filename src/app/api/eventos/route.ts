import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        eventDate: 'desc',
      },
    })
    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar eventos.' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const event = await prisma.event.create({ data })
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Erro ao criar evento.' },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'ID do evento é obrigatório.' },
        { status: 400 },
      )
    }
    await prisma.event.delete({ where: { id: Number(id) } })
    return NextResponse.json(
      { message: 'Evento deletado com sucesso.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error deleting event:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar evento.' },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'ID do evento é obrigatório.' },
        { status: 400 },
      )
    }
    const event = await prisma.event.update({
      where: { id: Number(id) },
      data,
    })
    return NextResponse.json(event)
  } catch (error) {
    console.error('Error updating event:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar evento.' },
      { status: 500 },
    )
  }
}
