'use client'

import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Notice as NoticeType, NoticePayload } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

type Notice = NoticeType

const initialForm: Omit<Notice, 'id'> = {
  title: '',
  message: '',
  active: true,
  startsAt: '',
  endsAt: '',
  imageUrl: '',
  videoUrl: '',
  linkUrl: '',
  linkLabel: '',
}

export default function AvisosAdminPage() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Notice | null>(null)
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)

  const fetchNotices = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/avisos')
      if (!res.ok) throw new Error('Falha ao carregar avisos')
      const data = await res.json()
      setNotices(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotices()
  }, [])

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const openDialog = (notice: Notice | null) => {
    setEditing(notice)
    setForm(
      notice
        ? {
            title: notice.title,
            message: notice.message,
            active: notice.active,
            startsAt: notice.startsAt ? notice.startsAt.slice(0, 16) : '',
            endsAt: notice.endsAt ? notice.endsAt.slice(0, 16) : '',
            imageUrl: notice.imageUrl || '',
            videoUrl: notice.videoUrl || '',
            linkUrl: notice.linkUrl || '',
            linkLabel: notice.linkLabel || '',
          }
        : initialForm,
    )
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    setIsDialogOpen(false)
    setEditing(null)
    setForm(initialForm)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload: NoticePayload = {
        title: form.title,
        message: form.message,
        active: form.active,
      }
      if (form.startsAt) payload.startsAt = new Date(form.startsAt)
      if (form.endsAt) payload.endsAt = new Date(form.endsAt)
      if (form.linkUrl) payload.linkUrl = form.linkUrl
      if (form.linkLabel) payload.linkLabel = form.linkLabel

      if (selectedImage) {
        const safeName = selectedImage.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
        const filePath = `notices/${Date.now()}-${safeName}`
        const { error: uploadError } = await supabase.storage
          .from('filhasDaTerra')
          .upload(filePath, selectedImage, {
            cacheControl: '3600',
            upsert: false,
            contentType: selectedImage.type,
          })
        if (uploadError)
          throw new Error(`Falha no upload da imagem: ${uploadError.message}`)
        const { data: publicData } = supabase.storage
          .from('filhasDaTerra')
          .getPublicUrl(filePath)
        payload.imageUrl = publicData.publicUrl
      }

      if (selectedVideo) {
        const safeName = selectedVideo.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
        const filePath = `notices/${Date.now()}-${safeName}`
        const { error: uploadError } = await supabase.storage
          .from('filhasDaTerra')
          .upload(filePath, selectedVideo, {
            cacheControl: '3600',
            upsert: false,
            contentType: selectedVideo.type,
          })
        if (uploadError)
          throw new Error(`Falha no upload do vídeo: ${uploadError.message}`)
        const { data: publicData } = supabase.storage
          .from('filhasDaTerra')
          .getPublicUrl(filePath)
        payload.videoUrl = publicData.publicUrl
      }

      const method = editing ? 'PUT' : 'POST'
      const body = JSON.stringify(
        editing ? { id: editing.id, ...payload } : payload,
      )
      const res = await fetch('/api/avisos', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      if (!res.ok) throw new Error('Falha ao salvar aviso')
      await fetchNotices()
      closeDialog()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao salvar')
    } finally {
      setSubmitting(false)
    }
  }

  const onDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este aviso?')) return
    try {
      const res = await fetch('/api/avisos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error('Falha ao deletar aviso')
      setNotices((prev) => prev.filter((n) => n.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao deletar')
    }
  }

  const toggleActive = async (notice: Notice) => {
    try {
      const res = await fetch('/api/avisos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: notice.id, active: !notice.active }),
      })
      if (!res.ok) throw new Error('Falha ao atualizar status')
      await fetchNotices()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao atualizar')
    }
  }

  return (
    <div className='space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>Gerenciar Avisos</h1>
        <Button onClick={() => openDialog(null)}>Novo Aviso</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[525px]'>
          <DialogHeader>
            <DialogTitle>{editing ? 'Editar Aviso' : 'Novo Aviso'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='title' className='text-right'>
                Título
              </label>
              <input
                id='title'
                name='title'
                value={form.title}
                onChange={onChange}
                className='col-span-3 p-2 border rounded-md bg-transparent'
                required
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='message' className='text-right'>
                Mensagem
              </label>
              <textarea
                id='message'
                name='message'
                value={form.message}
                onChange={onChange}
                className='col-span-3 p-2 border rounded-md bg-transparent h-28'
                required
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='image' className='text-right'>
                Imagem (opcional)
              </label>
              <div className='col-span-3 space-y-2'>
                {form.imageUrl && !selectedImage && (
                  <div className='text-xs text-gray-500 truncate'>
                    Imagem atual: {form.imageUrl}
                  </div>
                )}
                <input
                  id='image'
                  name='image'
                  type='file'
                  accept='image/*'
                  onChange={(e) =>
                    setSelectedImage(e.target.files?.[0] || null)
                  }
                  className='w-full text-sm bg-zinc-500 p-2 rounded-md'
                />
              </div>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='video' className='text-right'>
                Vídeo (opcional)
              </label>
              <div className='col-span-3 space-y-2'>
                {form.videoUrl && !selectedVideo && (
                  <div className='text-xs text-gray-500 truncate'>
                    Vídeo atual: {form.videoUrl}
                  </div>
                )}
                <input
                  id='video'
                  name='video'
                  type='file'
                  accept='video/*'
                  onChange={(e) =>
                    setSelectedVideo(e.target.files?.[0] || null)
                  }
                  className='w-full text-sm bg-zinc-500 p-2 rounded-md'
                />
              </div>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='linkUrl' className='text-right'>
                Link (opcional)
              </label>
              <input
                id='linkUrl'
                name='linkUrl'
                value={form.linkUrl || ''}
                onChange={onChange}
                className='col-span-3 p-2 border rounded-md bg-transparent'
                placeholder='https://...'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='linkLabel' className='text-right'>
                Texto do Link
              </label>
              <input
                id='linkLabel'
                name='linkLabel'
                value={form.linkLabel || ''}
                onChange={onChange}
                className='col-span-3 p-2 border rounded-md bg-transparent'
                placeholder='Saiba mais'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='startsAt' className='text-right'>
                Início
              </label>
              <input
                id='startsAt'
                name='startsAt'
                type='datetime-local'
                value={form.startsAt || ''}
                onChange={onChange}
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='endsAt' className='text-right'>
                Fim
              </label>
              <input
                id='endsAt'
                name='endsAt'
                type='datetime-local'
                value={form.endsAt || ''}
                onChange={onChange}
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='active' className='text-right'>
                Ativo
              </label>
              <input
                id='active'
                name='active'
                type='checkbox'
                checked={form.active}
                onChange={onChange}
                className='col-span-3 h-5 w-5'
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type='submit' disabled={submitting}>
                {submitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {loading && <p>Carregando avisos...</p>}
      {error && <p className='text-red-500'>Erro: {error}</p>}
      {!loading && !error && (
        <div className='border rounded-lg'>
          <ul className='divide-y divide-gray-200 dark:divide-gray-800'>
            {notices.map((n) => (
              <li
                key={n.id}
                className='p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 hover:bg-gray-50 dark:hover:bg-gray-900/30'
              >
                <div className='space-y-1'>
                  <h3 className='font-semibold'>{n.title}</h3>
                  <p className='text-sm text-gray-500 max-w-3xl line-clamp-2'>
                    {n.message}
                  </p>
                  <div className='text-xs text-gray-500'>
                    {n.active ? 'Ativo' : 'Inativo'}
                    {n.startsAt &&
                      ` • Início: ${new Date(n.startsAt).toLocaleString()}`}
                    {n.endsAt &&
                      ` • Fim: ${new Date(n.endsAt).toLocaleString()}`}
                  </div>
                </div>
                <div className='flex gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => openDialog(n)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => toggleActive(n)}
                  >
                    {n.active ? 'Desativar' : 'Ativar'}
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => onDelete(n.id)}
                  >
                    Deletar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          {notices.length === 0 && (
            <p className='p-4 text-center text-gray-500'>
              Nenhum aviso encontrado.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
