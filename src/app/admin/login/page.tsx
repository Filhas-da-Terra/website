'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin')
      } else {
        setError('Senha incorreta')
      }
    } catch {
      setError('Ocorreu um erro. Tente novamente.')
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 rounded'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <h1 className='text-2xl font-bold text-center text-gray-900 dark:text-white'>
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-gray-700 dark:text-gray-300'
            >
              Senha
            </label>
            <input
              id='password'
              name='password'
              type='password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          {error && <p className='text-sm text-red-600'>{error}</p>}
          <div>
            <button
              type='submit'
              className='w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
