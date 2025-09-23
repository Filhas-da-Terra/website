import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  try {
    const now = new Date()
    const notice = await prisma.notice.findFirst({
      where: {
        active: true,
        OR: [{ endsAt: null }, { endsAt: { gt: now } }],
        startsAt: { lte: now },
      },
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json(notice)
  } catch (error) {
    console.error('Erro ao buscar aviso ativo:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar aviso ativo.' },
      { status: 500 },
    )
  }
}
