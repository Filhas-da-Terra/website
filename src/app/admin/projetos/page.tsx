'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'

interface Project {
  id: number
  title: string
  description: string
  imageUrl: string | null
  projectUrl: string | null
}

const initialFormData: Omit<Project, 'id'> = {
  title: '',
  description: '',
  imageUrl: '',
  projectUrl: '',
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState(initialFormData)

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
    setFormData(project ? { ...project } : initialFormData)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingProject(null)
    setFormData(initialFormData)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const method = editingProject ? 'PUT' : 'POST'
    const body = JSON.stringify(
      editingProject ? { id: editingProject.id, ...formData } : formData,
    )

    try {
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

  return (
    <div className='space-y-8'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-semibold'>Gerenciar Projetos</h1>
        <Button onClick={() => handleOpenDialog(null)}>
          Adicionar Novo Projeto
        </Button>
      </div>

      {/* Dialog for Create/Edit */}
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
              <label htmlFor='imageUrl' className='text-right'>
                URL da Imagem
              </label>
              <input
                id='imageUrl'
                name='imageUrl'
                value={formData.imageUrl || ''}
                onChange={handleFormChange}
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='projectUrl' className='text-right'>
                URL do Projeto
              </label>
              <input
                id='projectUrl'
                name='projectUrl'
                value={formData.projectUrl || ''}
                onChange={handleFormChange}
                className='col-span-3 p-2 border rounded-md bg-transparent'
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant='secondary'>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type='submit'>Salvar</Button>
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
                className='p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-900/30'
              >
                <div>
                  <h3 className='font-semibold'>{project.title}</h3>
                  <p className='text-sm text-gray-500 mt-1 truncate max-w-md'>
                    {project.description}
                  </p>
                </div>
                <div className='flex gap-2'>
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
