import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params
    const project = await prisma.project.findFirst({
      where: { slug },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado.' },
        { status: 404 },
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar projeto.' },
      { status: 500 },
    )
  }
}
