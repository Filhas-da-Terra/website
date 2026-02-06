'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import type { Project, ProjectSection } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

const initialFormData: Omit<Project, 'id' | 'sections'> = {
  title: '',
  description: '',
  imageUrl: '',
  slug: '',
}

const initialSectionData: Omit<ProjectSection, 'id' | 'projectId'> = {
  title: '',
  content: '',
  imageUrl: null,
  order: 0,
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Project dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState(initialFormData)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sections dialog state
  const [isSectionsDialogOpen, setIsSectionsDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [sections, setSections] = useState<ProjectSection[]>([])
  const [loadingSections, setLoadingSections] = useState(false)

  // Section edit dialog state
  const [isSectionEditOpen, setIsSectionEditOpen] = useState(false)
  const [editingSection, setEditingSection] = useState<ProjectSection | null>(
    null,
  )
  const [sectionFormData, setSectionFormData] = useState(initialSectionData)
  const [sectionFile, setSectionFile] = useState<File | null>(null)
  const [isSectionSubmitting, setIsSectionSubmitting] = useState(false)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/projetos')
      if (!response.ok) throw new Error('Failed to fetch projects')
      const data = await response.json()
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleOpenDialog = (project: Project | null) => {
    setEditingProject(project)
    setFormData(
      project
        ? {
            title: project.title,
            description: project.description,
            imageUrl: project.imageUrl,
            slug: project.slug,
          }
        : initialFormData,
    )
    setSelectedFile(null)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingProject(null)
    setFormData(initialFormData)
    setSelectedFile(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const method = editingProject ? 'PUT' : 'POST'
    const payload = { ...formData }

    try {
      if (selectedFile) {
        const safeName = selectedFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
        const filePath = `projects/${Date.now()}-${safeName}`

        const { error: uploadError } = await supabase.storage
          .from('filhasDaTerra')
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: selectedFile.type,
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
        editingProject ? { id: editingProject.id, ...payload } : payload,
      )

      const response = await fetch('/api/projetos', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      })

      if (!response.ok) {
        throw new Error(
          editingProject
            ? 'Failed to update project'
            : 'Failed to create project',
        )
      }

      await fetchProjects()
      handleCloseDialog()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este projeto?')) return

    try {
      const response = await fetch('/api/projetos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete project')
      }

      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  // Sections management
  const fetchSections = async (slug: string) => {
    try {
      setLoadingSections(true)
      const response = await fetch(`/api/projetos/${slug}/sections`)
      if (!response.ok) throw new Error('Failed to fetch sections')
      const data = await response.json()
      setSections(data)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao buscar seções')
    } finally {
      setLoadingSections(false)
    }
  }

  const handleOpenSections = async (project: Project) => {
    if (!project.slug) {
      alert('Este projeto não tem um slug definido. Adicione um slug primeiro.')
      return
    }
    setSelectedProject(project)
    setIsSectionsDialogOpen(true)
    await fetchSections(project.slug)
  }

  const handleCloseSections = () => {
    setIsSectionsDialogOpen(false)
    setSelectedProject(null)
    setSections([])
  }

  const handleSectionFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setSectionFormData((prev) => ({
      ...prev,
      [name]: name === 'order' ? Number(value) : value,
    }))
  }

  const handleOpenSectionEdit = (section: ProjectSection | null) => {
    setEditingSection(section)
    setSectionFormData(
      section
        ? {
            title: section.title,
            content: section.content,
            imageUrl: section.imageUrl,
            order: section.order,
          }
        : { ...initialSectionData, order: sections.length },
    )
    setSectionFile(null)
    setIsSectionEditOpen(true)
  }

  const handleCloseSectionEdit = () => {
    setIsSectionEditOpen(false)
    setEditingSection(null)
    setSectionFormData(initialSectionData)
    setSectionFile(null)
  }

  const handleSectionSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!selectedProject?.slug) return

    setIsSectionSubmitting(true)
    const payload = { ...sectionFormData }

    try {
      if (sectionFile) {
        const safeName = sectionFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
        const filePath = `projects/sections/${Date.now()}-${safeName}`

        const { error: uploadError } = await supabase.storage
          .from('filhasDaTerra')
          .upload(filePath, sectionFile, {
            cacheControl: '3600',
            upsert: false,
            contentType: sectionFile.type,
          })

        if (uploadError) {
          throw new Error(`Falha no upload da imagem: ${uploadError.message}`)
        }

        const { data: publicData } = supabase.storage
          .from('filhasDaTerra')
          .getPublicUrl(filePath)

        payload.imageUrl = publicData.publicUrl
      }

      if (editingSection) {
        const response = await fetch(`/api/sections/${editingSection.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!response.ok) throw new Error('Failed to update section')
      } else {
        const response = await fetch(
          `/api/projetos/${selectedProject.slug}/sections`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          },
        )
        if (!response.ok) throw new Error('Failed to create section')
      }

      await fetchSections(selectedProject.slug)
      handleCloseSectionEdit()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao salvar seção')
    } finally {
      setIsSectionSubmitting(false)
    }
  }

  const handleDeleteSection = async (sectionId: number) => {
    if (!confirm('Tem certeza que deseja deletar esta seção?')) return
    if (!selectedProject?.slug) return

    try {
      const response = await fetch(`/api/sections/${sectionId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete section')
      await fetchSections(selectedProject.slug)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao deletar seção')
    }
  }

  return (
    <div className='space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>Gerenciar Projetos</h1>
        <Button onClick={() => handleOpenDialog(null)}>
          Adicionar Novo Projeto
        </Button>
      </div>

      {/* Dialog for Create/Edit Project */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Editar Projeto' : 'Adicionar Novo Projeto'}
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
                className='col-span-3 p-2 border rounded-md bg-transparent h-24'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='image' className='text-right'>
                Imagem
              </label>
              <div className='col-span-3 space-y-2'>
                {editingProject?.imageUrl && !selectedFile && (
                  <div className='text-sm text-gray-500'>
                    Imagem atual mantida. Selecione um arquivo para substituir.
                  </div>
                )}
                <input
                  id='image'
                  name='image'
                  type='file'
                  accept='image/*'
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className='w-full text-sm bg-zinc-500 p-2 rounded-md'
                />
              </div>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='slug' className='text-right'>
                Slug (URL)
              </label>
              <input
                id='slug'
                name='slug'
                value={formData.slug || ''}
                onChange={handleFormChange}
                placeholder='ex: horta-comunitaria'
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dialog for Sections Management */}
      <Dialog
        open={isSectionsDialogOpen}
        onOpenChange={setIsSectionsDialogOpen}
      >
        <DialogContent className='sm:max-w-[600px] max-h-[80vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>
              Seções do Projeto: {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <Button onClick={() => handleOpenSectionEdit(null)}>
              Adicionar Seção
            </Button>

            {loadingSections && <p>Carregando seções...</p>}

            {!loadingSections && sections.length === 0 && (
              <p className='text-gray-500'>Nenhuma seção adicionada.</p>
            )}

            {!loadingSections && sections.length > 0 && (
              <ul className='space-y-3'>
                {sections.map((section) => (
                  <li
                    key={section.id}
                    className='p-3 border rounded-lg flex justify-between items-start gap-4'
                  >
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <span className='text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded'>
                          #{section.order}
                        </span>
                        <h4 className='font-semibold'>{section.title}</h4>
                      </div>
                      <p className='text-sm text-gray-500 mt-1 line-clamp-2'>
                        {section.content.replace(/<[^>]*>/g, '').slice(0, 100)}
                        ...
                      </p>
                    </div>
                    <div className='flex gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleOpenSectionEdit(section)}
                      >
                        Editar
                      </Button>
                      <Button
                        variant='destructive'
                        size='sm'
                        onClick={() => handleDeleteSection(section.id)}
                      >
                        Deletar
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <DialogFooter>
            <Button variant='secondary' onClick={handleCloseSections}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for Section Edit */}
      <Dialog open={isSectionEditOpen} onOpenChange={setIsSectionEditOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>
              {editingSection ? 'Editar Seção' : 'Adicionar Seção'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSectionSubmit} className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='section-title' className='text-right'>
                Título
              </label>
              <input
                id='section-title'
                name='title'
                value={sectionFormData.title}
                onChange={handleSectionFormChange}
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='section-content' className='text-right'>
                Conteúdo
              </label>
              <textarea
                id='section-content'
                name='content'
                value={sectionFormData.content}
                onChange={handleSectionFormChange}
                placeholder='Texto da seção (suporta HTML)'
                className='col-span-3 p-2 border rounded-md bg-transparent h-32'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='section-image' className='text-right'>
                Imagem
              </label>
              <div className='col-span-3 space-y-2'>
                {editingSection?.imageUrl && !sectionFile && (
                  <div className='text-sm text-gray-500'>
                    Imagem atual mantida. Selecione um arquivo para substituir.
                  </div>
                )}
                <input
                  id='section-image'
                  name='image'
                  type='file'
                  accept='image/*'
                  onChange={(e) => setSectionFile(e.target.files?.[0] || null)}
                  className='w-full text-sm bg-zinc-500 p-2 rounded-md'
                />
              </div>
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='section-order' className='text-right'>
                Ordem
              </label>
              <input
                id='section-order'
                name='order'
                type='number'
                value={sectionFormData.order}
                onChange={handleSectionFormChange}
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type='submit' disabled={isSectionSubmitting}>
                {isSectionSubmitting ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* List of Projects */}
      {loading && <p>Carregando projetos...</p>}
      {error && <p className='text-red-500'>Erro: {error}</p>}
      {!loading && !error && (
        <div className='border rounded-lg'>
          <ul className='divide-y divide-gray-200 dark:divide-gray-800'>
            {projects.map((project) => (
              <li
                key={project.id}
                className='p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-900/30'
              >
                <div className='w-full sm:w-auto'>
                  <h3 className='font-semibold'>{project.title}</h3>
                  <p className='text-sm text-gray-500 mt-1 truncate max-w-md'>
                    {project.description}
                  </p>
                  {project.slug && (
                    <p className='text-xs text-green-600 mt-1'>
                      /projetos/{project.slug}
                    </p>
                  )}
                </div>
                <div className='flex gap-2 flex-shrink-0 self-start sm:self-center flex-wrap'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleOpenSections(project)}
                  >
                    Seções
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleOpenDialog(project)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => handleDelete(project.id)}
                  >
                    Deletar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          {projects.length === 0 && (
            <p className='p-4 text-center text-gray-500'>
              Nenhum projeto encontrado.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
