'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import type { Content } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

const initialFormData: Omit<Content, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  content: '',
  category: 'Documento',
  icon: 'FileText',
  link: '',
  linkText: 'Visualizar',
  imageUrl: '',
  featured: false,
}

const categoryIconMap: Record<string, string> = {
  Cadastro: 'Users',
  Petição: 'AlertTriangle',
  Documento: 'FileText',
  Portfólio: 'FileCheck',
  Videoclipe: 'Music',
  Seminário: 'Globe',
  Reportagem: 'Newspaper',
}

const categories = Object.keys(categoryIconMap)

export default function ContentAdminPage() {
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<Content | null>(null)
  const [formData, setFormData] = useState(initialFormData)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchContents = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/conteudos')
      if (!response.ok) throw new Error('Failed to fetch contents')
      const data = await response.json()
      setContents(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContents()
  }, [])

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target

    if (name === 'category') {
      // Automatically set icon based on category
      setFormData((prev) => ({
        ...prev,
        category: value,
        icon: categoryIconMap[value],
      }))
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleOpenDialog = (content: Content | null) => {
    setEditingContent(content)
    setFormData(content ? { ...content } : initialFormData)
    setSelectedFile(null)
    setSelectedImageFile(null)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingContent(null)
    setFormData(initialFormData)
    setSelectedFile(null)
    setSelectedImageFile(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const method = editingContent ? 'PUT' : 'POST'
    const payload = { ...formData }

    try {
      // Handle image file upload if an image is selected
      if (selectedImageFile) {
        const safeName = selectedImageFile.name.replace(
          /[^a-zA-Z0-9.\-_]/g,
          '_',
        )
        const filePath = `content-images/${Date.now()}-${safeName}`

        const { error: uploadError } = await supabase.storage
          .from('filhasDaTerra')
          .upload(filePath, selectedImageFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: selectedImageFile.type,
          })

        if (uploadError) {
          throw new Error(`Falha no upload da imagem: ${uploadError.message}`)
        }

        const { data: publicData } = supabase.storage
          .from('filhasDaTerra')
          .getPublicUrl(filePath)

        payload.imageUrl = publicData.publicUrl
      }

      // Handle file upload if a file is selected
      if (selectedFile) {
        const safeName = selectedFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
        const filePath = `contents/${Date.now()}-${safeName}`

        const { error: uploadError } = await supabase.storage
          .from('filhasDaTerra')
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: selectedFile.type,
          })

        if (uploadError) {
          throw new Error(`Falha no upload do arquivo: ${uploadError.message}`)
        }

        const { data: publicData } = supabase.storage
          .from('filhasDaTerra')
          .getPublicUrl(filePath)

        payload.link = publicData.publicUrl
      }

      const body = JSON.stringify(
        editingContent ? { id: editingContent.id, ...payload } : payload,
      )

      const response = await fetch('/api/conteudos', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      })

      if (!response.ok) {
        throw new Error(
          editingContent
            ? 'Failed to update content'
            : 'Failed to create content',
        )
      }

      await fetchContents()
      handleCloseDialog()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este conteúdo?')) return

    try {
      const response = await fetch('/api/conteudos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete content')
      }

      setContents((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  return (
    <div className='space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>Gerenciar Conteúdos</h1>
        <Button
          onClick={() => handleOpenDialog(null)}
          className='cursor-pointer'
        >
          Adicionar Novo Conteúdo
        </Button>
      </div>

      {/* Dialog for Create/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[500px] max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>
              {editingContent ? 'Editar Conteúdo' : 'Adicionar Novo Conteúdo'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='title' className='text-right'>
                Título
              </label>
              <input
                id='title'
                name='title'
                value={formData.title}
                onChange={handleFormChange}
                required
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='description' className='text-right'>
                Descrição
              </label>
              <textarea
                id='description'
                name='description'
                value={formData.description}
                onChange={handleFormChange}
                required
                className='col-span-3 p-2 border rounded-md bg-transparent h-20'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='content' className='text-right'>
                Conteúdo
              </label>
              <textarea
                id='content'
                name='content'
                value={formData.content}
                onChange={handleFormChange}
                required
                className='col-span-3 p-2 border rounded-md bg-transparent h-24'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='category' className='text-right'>
                Categoria
              </label>
              <div className='col-span-3 space-y-2'>
                <select
                  id='category'
                  name='category'
                  value={formData.category}
                  onChange={handleFormChange}
                  required
                  className='w-full p-2 border rounded-md bg-transparent'
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className='text-xs text-gray-500'>
                  Ícone: {categoryIconMap[formData.category]}
                </div>
              </div>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='link' className='text-right'>
                Link/URL
              </label>
              <div className='col-span-3 space-y-2'>
                <input
                  id='link'
                  name='link'
                  value={formData.link}
                  onChange={handleFormChange}
                  placeholder='URL ou deixe vazio para upload de arquivo'
                  className='w-full p-2 border rounded-md bg-transparent'
                />
                <div className='text-xs text-gray-500'>
                  Ou faça upload de um arquivo:
                </div>
                <input
                  id='file'
                  name='file'
                  type='file'
                  accept='.pdf,.doc,.docx,image/*,video/*'
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className='w-full text-sm bg-zinc-500 p-2 rounded-md'
                />
              </div>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='linkText' className='text-right'>
                Texto do Botão
              </label>
              <input
                id='linkText'
                name='linkText'
                value={formData.linkText}
                onChange={handleFormChange}
                required
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='imageUrl' className='text-right'>
                Imagem URL
              </label>
              <div className='col-span-3 space-y-2'>
                <input
                  id='imageUrl'
                  name='imageUrl'
                  value={formData.imageUrl || ''}
                  onChange={handleFormChange}
                  placeholder='URL da imagem ou deixe vazio para upload'
                  className='w-full p-2 border rounded-md bg-transparent'
                />
                <div className='text-xs text-gray-500'>
                  Ou faça upload de uma imagem:
                </div>
                <input
                  id='imageFile'
                  name='imageFile'
                  type='file'
                  accept='image/*'
                  onChange={(e) =>
                    setSelectedImageFile(e.target.files?.[0] || null)
                  }
                  className='w-full text-sm bg-zinc-500 p-2 rounded-md'
                />
              </div>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='featured' className='text-right'>
                Destaque
              </label>
              <div className='col-span-3 flex items-center gap-2'>
                <input
                  id='featured'
                  name='featured'
                  type='checkbox'
                  checked={formData.featured || false}
                  onChange={handleFormChange}
                  className='w-5 h-5 cursor-pointer'
                />
                <span className='text-sm text-gray-500'>
                  Marcar como conteúdo em destaque
                </span>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type='button'
                  variant='secondary'
                  className='cursor-pointer'
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='cursor-pointer'
              >
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* List of Contents */}
      {loading && <p>Carregando conteúdos...</p>}
      {error && <p className='text-red-500'>Erro: {error}</p>}
      {!loading && !error && (
        <div className='border rounded-lg'>
          <ul className='divide-y divide-gray-200 dark:divide-gray-800'>
            {contents.map((content) => (
              <li
                key={content.id}
                className='p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-900/30'
              >
                <div className='w-full sm:w-auto'>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-semibold'>{content.title}</h3>
                    {content.featured && (
                      <span className='text-xs bg-orange-500 text-white px-2 py-0.5 rounded font-medium'>
                        DESTAQUE
                      </span>
                    )}
                  </div>
                  <p className='text-sm text-gray-500 mt-1'>
                    {content.description}
                  </p>
                  <div className='flex gap-2 mt-2'>
                    <span className='text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded'>
                      {content.category}
                    </span>
                    {content.imageUrl && (
                      <span className='text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded'>
                        📷 Com imagem
                      </span>
                    )}
                  </div>
                </div>
                <div className='flex gap-2 flex-shrink-0 self-start sm:self-center'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleOpenDialog(content)}
                    className='cursor-pointer'
                  >
                    Editar
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => handleDelete(content.id)}
                    className='cursor-pointer'
                  >
                    Deletar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          {contents.length === 0 && (
            <p className='p-4 text-center text-gray-500'>
              Nenhum conteúdo encontrado.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
