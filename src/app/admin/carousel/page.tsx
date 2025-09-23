'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import type { CarouselImage } from '@/types'
import Image from 'next/image'

export default function CarouselAdminPage() {
  const [images, setImages] = useState<CarouselImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const fetchImages = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/carousel')
      if (res.ok) {
        const data = await res.json()
        setImages(data)
      } else {
        setError('Falha ao carregar imagens.')
      }
    } catch (err) {
      console.error(err)
      setError('Ocorreu um erro ao carregar as imagens.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const handleDelete = async (name: string) => {
    if (!confirm(`Tem certeza que deseja deletar a imagem "${name}"?`)) return

    try {
      const res = await fetch('/api/carousel', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.name !== name))
        alert('Imagem deletada com sucesso!')
      } else {
        const errorData = await res.json()
        alert(`Erro ao deletar imagem: ${errorData.error}`)
      }
    } catch (err) {
      console.error(err)
      alert('Ocorreu um erro ao tentar deletar a imagem.')
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo.')
      return
    }

    setUploading(true)
    try {
      const response = await fetch('/api/carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileType: selectedFile.type }),
      })

      if (!response.ok) throw new Error('Falha ao obter URL de upload.')

      const { signedUrl, newFileName } = await response.json()

      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: selectedFile,
        headers: {
          'Content-Type': selectedFile.type,
        },
      })

      if (!uploadResponse.ok) throw new Error('Falha no upload do arquivo.')

      await fetchImages()
      alert(`Imagem "${newFileName}" enviada com sucesso!`)
      setSelectedFile(null)
      const fileInput = document.getElementById(
        'file-input',
      ) as HTMLInputElement
      if (fileInput) fileInput.value = ''
    } catch (err) {
      console.error(err)
      alert('Ocorreu um erro durante o upload.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className='space-y-8'>
      <h1 className='text-2xl font-semibold'>Gerenciar Imagens do Carousel</h1>

      <div className='p-4 border rounded-lg bg-gray-50 dark:bg-gray-900/30'>
        <h2 className='text-xl font-semibold mb-4'>Adicionar Nova Imagem</h2>
        <div className='flex flex-col sm:flex-row gap-4'>
          <input
            id='file-input'
            type='file'
            onChange={handleFileChange}
            accept='image/jpeg,image/png,image/webp'
            className='flex-grow border rounded-md p-2 bg-white dark:bg-gray-800'
          />
          <Button onClick={handleUpload} disabled={uploading || !selectedFile}>
            {uploading ? 'Enviando...' : 'Enviar Imagem'}
          </Button>
        </div>
      </div>

      <div>
        <h2 className='text-xl font-semibold'>Imagens Atuais</h2>
        {loading && <p className='mt-4'>Carregando...</p>}
        {error && <p className='mt-4 text-red-500'>{error}</p>}
        {!loading &&
          !error &&
          (images.length > 0 ? (
            <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
              {images.map((img) => (
                <li
                  key={img.name}
                  className='border rounded-md overflow-hidden group bg-white dark:bg-gray-900/30'
                >
                  <div className='relative w-full h-48'>
                    <Image
                      src={img.url}
                      alt={img.name}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2'>
                    <div
                      className='truncate text-sm font-medium w-full sm:w-auto'
                      title={img.name}
                    >
                      {img.name}
                    </div>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => handleDelete(img.name)}
                      className='self-start sm:self-auto'
                    >
                      Deletar
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className='mt-4 text-gray-500'>Nenhuma imagem encontrada.</p>
          ))}
      </div>
    </div>
  )
}
