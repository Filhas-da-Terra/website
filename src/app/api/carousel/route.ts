import { NextResponse, NextRequest } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

const BUCKET_NAME = 'filhasDaTerra'

export async function GET() {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(undefined, { search: 'foto' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
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
        { error: 'fileType must be an image type (e.g., image/jpeg)' },
        { status: 400 },
      )
    }
    const extension = fileType.split('/')[1]

    const { data: existingFiles, error: listError } = await supabase.storage
      .from(BUCKET_NAME)
      .list(undefined, { search: 'foto' })

    if (listError) {
      console.error('Error listing files:', listError)
      throw new Error('Could not list files to determine new name.')
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
      console.error('Error creating signed URL:', signedUrlError)
      throw new Error('Could not create signed URL for upload.')
    }

    return NextResponse.json({ ...data, newFileName })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json(
        { error: 'File name is required' },
        { status: 400 },
      )
    }

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([name])

    if (error) {
      console.error('Supabase storage error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error: unknown) {
    console.error('Error processing DELETE request:', error)
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { error: 'Error processing request' },
      { status: 500 },
    )
  }
}
