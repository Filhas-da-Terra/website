'use client'

import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { Alert as AlertType, AlertPayload } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

type Alert = AlertType

const initialForm: Omit<Alert, 'id'> = {
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

export default function AlertsAdminPage() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Alert | null>(null)
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)

  const fetchAlerts = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/alerts')
      if (!res.ok) throw new Error('Falha ao carregar alertas')
      const data = await res.json()
      setAlerts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlerts()
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

  const openDialog = (alert: Alert | null) => {
    setEditing(alert)
    setForm(
      alert
        ? {
            title: alert.title,
            message: alert.message,
            active: alert.active,
            startsAt: alert.startsAt ? alert.startsAt.slice(0, 16) : '',
            endsAt: alert.endsAt ? alert.endsAt.slice(0, 16) : '',
            imageUrl: alert.imageUrl || '',
            videoUrl: alert.videoUrl || '',
            linkUrl: alert.linkUrl || '',
            linkLabel: alert.linkLabel || '',
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
      const payload: AlertPayload = {
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
        const filePath = `alerts/${Date.now()}-${safeName}`
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
        const filePath = `alerts/${Date.now()}-${safeName}`
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
      const res = await fetch('/api/alerts', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      })
      if (!res.ok) throw new Error('Falha ao salvar alerta')
      await fetchAlerts()
      closeDialog()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao salvar')
    } finally {
      setSubmitting(false)
    }
  }

  const onDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este alerta?')) return
    try {
      const res = await fetch('/api/alerts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) throw new Error('Falha ao deletar alerta')
      setAlerts((prev) => prev.filter((n) => n.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao deletar')
    }
  }

  const toggleActive = async (alertItem: Alert) => {
    try {
      const res = await fetch('/api/alerts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: alertItem.id, active: !alertItem.active }),
      })
      if (!res.ok) throw new Error('Falha ao atualizar status')
      await fetchAlerts()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao atualizar')
    }
  }

  return (
    <div className='space-y-8'>
      <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-4'>
        <h1 className='text-2xl font-semibold'>Gerenciar Alertas</h1>
        <Button
          onClick={() => openDialog(null)}
          className='self-start sm:self-auto'
        >
          Novo Alerta
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[525px]'>
          <DialogHeader>
            <DialogTitle>
              {editing ? 'Editar Alerta' : 'Novo Alerta'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className='grid gap-4 py-4'>
            <div className='grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4'>
              <label htmlFor='title' className='md:text-right'>
                Título
              </label>
              <input
                id='title'
                name='title'
                value={form.title}
                onChange={onChange}
                className='md:col-span-3 p-2 border rounded-md bg-transparent'
                required
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4'>
              <label htmlFor='message' className='md:text-right'>
                Mensagem
              </label>
              <textarea
                id='message'
                name='message'
                value={form.message}
                onChange={onChange}
                className='md:col-span-3 p-2 border rounded-md bg-transparent h-28'
                required
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4'>
              <label htmlFor='image' className='md:text-right'>
                Imagem (opcional)
              </label>
              <div className='md:col-span-3 space-y-2'>
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
            <div className='grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4'>
              <label htmlFor='video' className='md:text-right'>
                Vídeo (opcional)
              </label>
              <div className='md:col-span-3 space-y-2'>
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
            <div className='grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4'>
              <label htmlFor='linkUrl' className='md:text-right'>
                Link (opcional)
              </label>
              <input
                id='linkUrl'
                name='linkUrl'
                value={form.linkUrl || ''}
                onChange={onChange}
                className='md:col-span-3 p-2 border rounded-md bg-transparent'
                placeholder='https://...'
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4'>
              <label htmlFor='linkLabel' className='md:text-right'>
                Texto do Link
              </label>
              <input
                id='linkLabel'
                name='linkLabel'
                value={form.linkLabel || ''}
                onChange={onChange}
                className='md:col-span-3 p-2 border rounded-md bg-transparent'
                placeholder='Saiba mais'
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4'>
              <label htmlFor='startsAt' className='md:text-right'>
                Início
              </label>
              <input
                id='startsAt'
                name='startsAt'
                type='datetime-local'
                value={form.startsAt || ''}
                onChange={onChange}
                className='md:col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4'>
              <label htmlFor='endsAt' className='md:text-right'>
                Fim
              </label>
              <input
                id='endsAt'
                name='endsAt'
                type='datetime-local'
                value={form.endsAt || ''}
                onChange={onChange}
                className='md:col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 items-start md:items-center gap-2 md:gap-4'>
              <label htmlFor='active' className='md:text-right'>
                Ativo
              </label>
              <input
                id='active'
                name='active'
                type='checkbox'
                checked={form.active}
                onChange={onChange}
                className='h-5 w-5'
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

      {loading && <p>Carregando alertas...</p>}
      {error && <p className='text-red-500'>Erro: {error}</p>}
      {!loading && !error && (
        <div className='border rounded-lg'>
          <ul className='divide-y divide-gray-200 dark:divide-gray-800'>
            {alerts.map((n) => (
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
                <div className='flex flex-wrap gap-2 self-start md:self-center'>
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
          {alerts.length === 0 && (
            <p className='p-4 text-center text-gray-500'>
              Nenhum alerta encontrado.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
