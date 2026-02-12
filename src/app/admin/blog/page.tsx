'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import type { BlogPost } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

const initialFormData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  slug: '',
  author: null,
  authorBio: null,
  authorImageUrl: null,
  excerpt: '',
  content: '',
  imageUrl: null,
  published: false,
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState(initialFormData)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [selectedAuthorImageFile, setSelectedAuthorImageFile] =
    useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/blog')
      if (!response.ok) throw new Error('Failed to fetch posts')
      const data = await response.json()
      setPosts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (name === 'title') {
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: editingPost ? prev.slug : slugify(value),
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleOpenDialog = (post: BlogPost | null) => {
    setEditingPost(post)
    setFormData(
      post
        ? {
            title: post.title,
            slug: post.slug,
            author: post.author,
            authorBio: post.authorBio,
            authorImageUrl: post.authorImageUrl,
            excerpt: post.excerpt,
            content: post.content,
            imageUrl: post.imageUrl,
            published: post.published,
          }
        : initialFormData,
    )
    setSelectedImageFile(null)
    setSelectedAuthorImageFile(null)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingPost(null)
    setFormData(initialFormData)
    setSelectedImageFile(null)
    setSelectedAuthorImageFile(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const payload = {
      ...formData,
      author: formData.author || null,
      authorBio: formData.authorBio || null,
      authorImageUrl: formData.authorImageUrl || null,
      imageUrl: formData.imageUrl || null,
    }

    try {
      if (selectedAuthorImageFile) {
        const safeName = selectedAuthorImageFile.name.replace(
          /[^a-zA-Z0-9.\-_]/g,
          '_',
        )
        const filePath = `blog/authors/${Date.now()}-${safeName}`

        const { error: uploadError } = await supabase.storage
          .from('filhasDaTerra')
          .upload(filePath, selectedAuthorImageFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: selectedAuthorImageFile.type,
          })

        if (uploadError) {
          throw new Error(
            `Falha no upload da foto do autor: ${uploadError.message}`,
          )
        }

        const { data: publicData } = supabase.storage
          .from('filhasDaTerra')
          .getPublicUrl(filePath)

        payload.authorImageUrl = publicData.publicUrl
      }

      if (selectedImageFile) {
        const safeName = selectedImageFile.name.replace(
          /[^a-zA-Z0-9.\-_]/g,
          '_',
        )
        const filePath = `blog/${Date.now()}-${safeName}`

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

      if (editingPost) {
        const response = await fetch('/api/blog', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingPost.id, ...payload }),
        })
        if (!response.ok) throw new Error('Failed to update post')
      } else {
        const response = await fetch('/api/blog', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error('Failed to create post')
      }

      await fetchPosts()
      handleCloseDialog()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este post?')) return

    try {
      const response = await fetch('/api/blog', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) throw new Error('Failed to delete post')

      setPosts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  return (
    <div className='space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>Gerenciar Blog</h1>
        <Button
          onClick={() => handleOpenDialog(null)}
          className='cursor-pointer'
        >
          Nova Postagem
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[600px] max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>
              {editingPost ? 'Editar Post' : 'Nova Postagem'}
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
                Slug (URL)
              </label>
              <input
                id='slug'
                name='slug'
                value={formData.slug}
                onChange={handleFormChange}
                required
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='author' className='text-right'>
                Autor(a)
              </label>
              <input
                id='author'
                name='author'
                value={formData.author || ''}
                onChange={handleFormChange}
                placeholder='Nome do autor ou autora'
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='authorBio' className='text-right'>
                Bio do autor(a)
              </label>
              <textarea
                id='authorBio'
                name='authorBio'
                value={formData.authorBio || ''}
                onChange={handleFormChange}
                placeholder='Breve biografia'
                className='col-span-3 p-2 border rounded-md bg-transparent h-20'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='authorImageUrl' className='text-right'>
                Foto do autor(a)
              </label>
              <div className='col-span-3 space-y-2'>
                <input
                  id='authorImageUrl'
                  name='authorImageUrl'
                  value={formData.authorImageUrl || ''}
                  onChange={handleFormChange}
                  placeholder='URL ou upload abaixo'
                  className='w-full p-2 border rounded-md bg-transparent'
                />
                <input
                  id='authorImageFile'
                  type='file'
                  accept='image/*'
                  onChange={(e) =>
                    setSelectedAuthorImageFile(e.target.files?.[0] || null)
                  }
                  className='w-full text-sm bg-zinc-500 p-2 rounded-md'
                />
              </div>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='excerpt' className='text-right'>
                Resumo
              </label>
              <textarea
                id='excerpt'
                name='excerpt'
                value={formData.excerpt}
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
                className='col-span-3 p-2 border rounded-md bg-transparent h-32'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='imageUrl' className='text-right'>
                Imagem
              </label>
              <div className='col-span-3 space-y-2'>
                <input
                  id='imageUrl'
                  name='imageUrl'
                  value={formData.imageUrl || ''}
                  onChange={handleFormChange}
                  placeholder='URL ou upload abaixo'
                  className='w-full p-2 border rounded-md bg-transparent'
                />
                <input
                  id='imageFile'
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
              <label htmlFor='published' className='text-right'>
                Publicado
              </label>
              <div className='col-span-3 flex items-center gap-2'>
                <input
                  id='published'
                  name='published'
                  type='checkbox'
                  checked={formData.published}
                  onChange={handleFormChange}
                  className='w-5 h-5 cursor-pointer'
                />
                <span className='text-sm text-gray-500'>
                  Exibir na página pública do blog
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

      {loading && <p>Carregando posts...</p>}
      {error && <p className='text-red-500'>Erro: {error}</p>}
      {!loading && !error && (
        <div className='border rounded-lg'>
          <ul className='divide-y divide-gray-200 dark:divide-gray-800'>
            {posts.map((post) => (
              <li
                key={post.id}
                className='p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-900/30'
              >
                <div className='w-full sm:w-auto'>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-semibold'>{post.title}</h3>
                    {post.published ? (
                      <span className='text-xs bg-green-600 text-white px-2 py-0.5 rounded font-medium'>
                        PUBLICADO
                      </span>
                    ) : (
                      <span className='text-xs bg-gray-500 text-white px-2 py-0.5 rounded font-medium'>
                        RASCUNHO
                      </span>
                    )}
                  </div>
                  <p className='text-sm text-gray-500 mt-1 line-clamp-1'>
                    {post.excerpt}
                  </p>
                  <div className='flex flex-wrap gap-2 mt-1'>
                    {post.author && (
                      <span className='text-xs text-gray-600 dark:text-gray-400'>
                        Por {post.author}
                      </span>
                    )}
                    <span className='text-xs text-gray-400'>{post.slug}</span>
                  </div>
                </div>
                <div className='flex gap-2 flex-shrink-0 self-start sm:self-center'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleOpenDialog(post)}
                    className='cursor-pointer'
                  >
                    Editar
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => handleDelete(post.id)}
                    className='cursor-pointer'
                  >
                    Deletar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          {posts.length === 0 && (
            <p className='p-4 text-center text-gray-500'>
              Nenhum post no blog. Clique em &quot;Nova Postagem&quot; para
              começar.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
