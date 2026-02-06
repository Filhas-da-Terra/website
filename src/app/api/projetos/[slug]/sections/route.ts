import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params
    const project = await prisma.project.findFirst({
      where: { slug },
      select: { id: true },
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado.' },
        { status: 404 },
      )
    }

    const sections = await prisma.projectSection.findMany({
      where: { projectId: project.id },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(sections)
  } catch (error) {
    console.error('Error fetching sections:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar seções.' },
      { status: 500 },
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params
    const project = await prisma.project.findFirst({
      where: { slug },
      select: { id: true },
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projeto não encontrado.' },
        { status: 404 },
      )
    }

    const data = await request.json()
    const section = await prisma.projectSection.create({
      data: {
        ...data,
        projectId: project.id,
      },
    })

    return NextResponse.json(section, { status: 201 })
  } catch (error) {
    console.error('Error creating section:', error)
    return NextResponse.json({ error: 'Erro ao criar seção.' }, { status: 500 })
  }
}
