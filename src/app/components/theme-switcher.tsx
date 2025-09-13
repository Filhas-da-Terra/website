'use client'
import { MoonIcon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className='p-2 cursor-pointer'
      >
        {theme === 'light' ? (
          <span role='img' aria-label='Switch to dark mode'>
            <MoonIcon />
          </span>
        ) : (
          <span role='img' aria-label='Switch to light mode'>
            <Sun />
          </span>
        )}
      </button>
    </div>
  )
}

export default ThemeSwitcher
