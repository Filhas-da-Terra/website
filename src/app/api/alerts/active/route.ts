import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const now = new Date()
    const alert = await prisma.alert.findFirst({
      where: {
        active: true,
        OR: [{ endsAt: null }, { endsAt: { gt: now } }],
        startsAt: { lte: now },
      },
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json(alert)
  } catch (error) {
    console.error('Erro ao buscar alerta ativo:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar alerta ativo.' },
      { status: 500 },
    )
  }
}
