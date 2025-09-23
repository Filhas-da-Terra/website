import Link from 'next/link'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-screen bg-white dark:bg-black'>
      <aside className='w-64 bg-gray-50 dark:bg-gray-900/30 p-6 border-r border-gray-200 dark:border-gray-800'>
        <h2 className='text-xl font-semibold mb-6'>Admin</h2>
        <nav className='space-y-2'>
          <Link href='/admin/carousel'>
            <span className='flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer'>
              Carousel
            </span>
          </Link>
          <Link href='/admin/projetos'>
            <span className='flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer'>
              Projetos
            </span>
          </Link>
          <Link href='/admin/avisos'>
            <span className='flex items-center px-3 py-2 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer'>
              Avisos
            </span>
          </Link>
        </nav>
      </aside>
      <main className='flex-1 p-6 md:p-10'>{children}</main>
    </div>
  )
}
