import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const alerts = await prisma.alert.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(alerts)
  } catch (error) {
    console.error('Erro ao buscar alertas:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar alertas.' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const alert = await prisma.alert.create({ data })
    return NextResponse.json(alert, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar alerta:', error)
    return NextResponse.json(
      { error: 'Erro ao criar alerta.' },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'ID do alerta é obrigatório.' },
        { status: 400 },
      )
    }
    const alert = await prisma.alert.update({
      where: { id: Number(id) },
      data,
    })
    return NextResponse.json(alert)
  } catch (error) {
    console.error('Erro ao atualizar alerta:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar alerta.' },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'ID do alerta é obrigatório.' },
        { status: 400 },
      )
    }
    await prisma.alert.delete({ where: { id: Number(id) } })
    return NextResponse.json({ message: 'Alerta deletado com sucesso.' })
  } catch (error) {
    console.error('Erro ao deletar alerta:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar alerta.' },
      { status: 500 },
    )
  }
}
