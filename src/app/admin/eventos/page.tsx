'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import type { EventItem } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

const initialFormData: Omit<EventItem, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  content: '',
  eventDate: new Date().toISOString().split('T')[0],
  eventTime: '',
  location: '',
  imageUrl: '',
  instagramUrl: '',
  featured: false,
  slug: '',
}

export default function EventosAdminPage() {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null)
  const [formData, setFormData] = useState(initialFormData)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/eventos')
      if (!response.ok) throw new Error('Failed to fetch events')
      const data = await response.json()
      setEvents(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (name === 'title') {
      // Auto-generate slug from title
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData((prev) => ({ ...prev, title: value, slug }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleOpenDialog = (event: EventItem | null) => {
    setEditingEvent(event)
    if (event) {
      // Convert date to YYYY-MM-DD format for input
      const eventDate = new Date(event.eventDate).toISOString().split('T')[0]
      setFormData({ ...event, eventDate })
    } else {
      setFormData(initialFormData)
    }
    setSelectedImageFile(null)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingEvent(null)
    setFormData(initialFormData)
    setSelectedImageFile(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const method = editingEvent ? 'PUT' : 'POST'
    const payload = { ...formData }

    try {
      // Handle image file upload if an image is selected
      if (selectedImageFile) {
        const safeName = selectedImageFile.name.replace(
          /[^a-zA-Z0-9.\-_]/g,
          '_',
        )
        const filePath = `event-images/${Date.now()}-${safeName}`

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

      const body = JSON.stringify(
        editingEvent ? { id: editingEvent.id, ...payload } : payload,
      )

      const response = await fetch('/api/eventos', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      })

      if (!response.ok) {
        throw new Error(
          editingEvent ? 'Failed to update event' : 'Failed to create event',
        )
      }

      await fetchEvents()
      handleCloseDialog()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este evento?')) return

    try {
      const response = await fetch('/api/eventos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete event')
      }

      setEvents((prev) => prev.filter((e) => e.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  return (
    <div className='space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>Gerenciar Eventos</h1>
        <Button
          onClick={() => handleOpenDialog(null)}
          className='cursor-pointer'
        >
          Adicionar Novo Evento
        </Button>
      </div>

      {/* Dialog for Create/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>
              {editingEvent ? 'Editar Evento' : 'Adicionar Novo Evento'}
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
              <label htmlFor='slug' className='text-right'>
                Slug
              </label>
              <input
                id='slug'
                name='slug'
                value={formData.slug}
                onChange={handleFormChange}
                required
                className='col-span-3 p-2 border rounded-md bg-transparent'
                placeholder='url-amigavel'
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
              <label htmlFor='eventDate' className='text-right'>
                Data
              </label>
              <input
                id='eventDate'
                name='eventDate'
                type='date'
                value={formData.eventDate}
                onChange={handleFormChange}
                required
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='eventTime' className='text-right'>
                Horário
              </label>
              <input
                id='eventTime'
                name='eventTime'
                value={formData.eventTime || ''}
                onChange={handleFormChange}
                placeholder='09:00 - 17:00'
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='location' className='text-right'>
                Local
              </label>
              <input
                id='location'
                name='location'
                value={formData.location || ''}
                onChange={handleFormChange}
                placeholder='Local do evento'
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
              <label htmlFor='instagramUrl' className='text-right'>
                Instagram URL
              </label>
              <input
                id='instagramUrl'
                name='instagramUrl'
                value={formData.instagramUrl || ''}
                onChange={handleFormChange}
                placeholder='https://www.instagram.com/p/...'
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
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
                  Marcar como evento em destaque
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

      {/* List of Events */}
      {loading && <p>Carregando eventos...</p>}
      {error && <p className='text-red-500'>Erro: {error}</p>}
      {!loading && !error && (
        <div className='border rounded-lg'>
          <ul className='divide-y divide-gray-200 dark:divide-gray-800'>
            {events.map((event) => (
              <li
                key={event.id}
                className='p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-900/30'
              >
                <div className='w-full sm:w-auto'>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-semibold'>{event.title}</h3>
                    {event.featured && (
                      <span className='text-xs bg-orange-500 text-white px-2 py-0.5 rounded font-medium'>
                        DESTAQUE
                      </span>
                    )}
                  </div>
                  <p className='text-sm text-gray-500 mt-1'>
                    {event.description}
                  </p>
                  <div className='flex gap-2 mt-2 flex-wrap'>
                    <span className='text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded'>
                      📅 {new Date(event.eventDate).toLocaleDateString('pt-BR')}
                    </span>
                    {event.eventTime && (
                      <span className='text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded'>
                        🕒 {event.eventTime}
                      </span>
                    )}
                    {event.imageUrl && (
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
                    onClick={() => handleOpenDialog(event)}
                    className='cursor-pointer'
                  >
                    Editar
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => handleDelete(event.id)}
                    className='cursor-pointer'
                  >
                    Deletar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          {events.length === 0 && (
            <p className='p-4 text-center text-gray-500'>
              Nenhum evento encontrado.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
