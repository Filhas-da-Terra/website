import { NextResponse, NextRequest } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

const BUCKET_NAME = 'filhasDaTerra'

export async function GET() {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(undefined, { search: 'foto' })

  if (error) {
    return NextResponse.json(
      { error: 'Erro ao listar imagens do carousel.' },
      { status: 500 },
    )
  }

  if (!data) {
    return NextResponse.json([])
  }

  const imageFiles = data
    .filter((file) => file.name.match(/\.(jpg|jpeg|png|webp)$/i))
    .sort((a, b) => {
      const numA = parseInt(a.name.match(/(\d+)/)?.[0] || '0', 10)
      const numB = parseInt(b.name.match(/(\d+)/)?.[0] || '0', 10)
      return numA - numB
    })

  const files = imageFiles.map((file) => {
    const publicUrl = supabase.storage.from(BUCKET_NAME).getPublicUrl(file.name)
    return {
      name: file.name,
      url: publicUrl.data.publicUrl,
    }
  })

  return NextResponse.json(files)
}

export async function POST(request: NextRequest) {
  try {
    const { fileType } = await request.json()

    if (!fileType || !fileType.startsWith('image/')) {
      return NextResponse.json(
        { error: 'fileType deve ser um tipo de imagem (ex.: image/jpeg)' },
        { status: 400 },
      )
    }
    const extension = fileType.split('/')[1]

    const { data: existingFiles, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list(undefined, { search: 'foto' })

    if (listError) {
      console.error('Erro ao listar arquivos:', listError)
      throw new Error(
        'Não foi possível listar arquivos para determinar o novo nome.',
      )
    }

    let nextNumber = 1
    if (existingFiles && existingFiles.length > 0) {
      const numbers = existingFiles
        .map((file) => {
          const match = file.name.match(/^foto(\d+)\..+$/i)
          return match ? parseInt(match[1], 10) : 0
        })
        .filter((num) => !isNaN(num))

      if (numbers.length > 0) {
        nextNumber = Math.max(...numbers) + 1
      }
    }

    const newFileName = `foto${nextNumber}.${extension}`

    const { data, error: signedUrlError } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUploadUrl(newFileName)

    if (signedUrlError) {
      console.error('Erro ao criar URL assinada:', signedUrlError)
      throw new Error('Não foi possível criar URL assinada para upload.')
    }

    return NextResponse.json({ ...data, newFileName })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json(
        { error: 'Nome do arquivo é obrigatório' },
        { status: 400 },
      )
    }

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([name])

    if (error) {
      console.error('Erro no storage do Supabase:', error)
      return NextResponse.json(
        { error: 'Erro ao deletar arquivo do storage.' },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error: unknown) {
    console.error('Erro ao processar requisição DELETE:', error)
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'JSON inválido no corpo da requisição' },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { error: 'Erro ao processar requisição' },
      { status: 500 },
    )
  }
}
