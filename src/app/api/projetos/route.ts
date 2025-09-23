import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar projetos.' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const project = await prisma.project.create({ data })
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Erro ao criar projeto.' },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'ID do projeto é obrigatório.' },
        { status: 400 },
      )
    }
    await prisma.project.delete({ where: { id: Number(id) } })
    return NextResponse.json(
      { message: 'Projeto deletado com sucesso.' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Erro ao deletar projeto.' },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...data } = await request.json()
    if (!id) {
      return NextResponse.json(
        { error: 'ID do projeto é obrigatório.' },
        { status: 400 },
      )
    }
    const project = await prisma.project.update({
      where: { id: Number(id) },
      data,
    })
    return NextResponse.json(project)
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar projeto.' },
      { status: 500 },
    )
  }
}
