'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog'
import { HandHeart, Menu } from 'lucide-react'
import ThemeSwitcher from './theme-switcher'

export default function Header() {
  const [openPix, setOpenPix] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const pathname = usePathname()

  return (
    <header className='bg-transparent shadow-xl shadow-gray-300 dark:shadow-gray-900'>
      <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
        {/* Logo */}
        <Link href='/' className='flex items-center space-x-2'>
          <Image
            src='https://nkualykoqttmxfbhydav.supabase.co/storage/v1/object/public/filhasDaTerra/logoColorida.png'
            alt='Logo'
            width={50}
            height={50}
          />
        </Link>

        {/* Navegação desktop */}
        <nav className='hidden md:flex items-center space-x-6 text-black dark:text-white'>
          <Link
            href='/'
            className={`hover:underline transition-colors ${pathname === '/' ? 'underline font-semibold text-[#92400e] dark:text-orange-400' : 'hover:text-[#92400e] dark:hover:text-orange-400'}`}
          >
            Início
          </Link>
          <Link
            href='/sobre'
            className={`hover:underline transition-colors ${pathname === '/sobre' ? 'underline font-semibold text-[#92400e] dark:text-orange-400' : 'hover:text-[#92400e] dark:hover:text-orange-400'}`}
          >
            Quem Somos
          </Link>
          <Link
            href='/projetos'
            className={`hover:underline transition-colors ${pathname === '/projetos' ? 'underline font-semibold text-[#92400e] dark:text-orange-400' : 'hover:text-[#92400e] dark:hover:text-orange-400'}`}
          >
            Projetos
          </Link>
          <Link
            href='/contatos'
            className={`hover:underline transition-colors ${pathname === '/contatos' ? 'underline font-semibold text-[#92400e] dark:text-orange-400' : 'hover:text-[#92400e] dark:hover:text-orange-400'}`}
          >
            Contato
          </Link>
          <Link
            href='/transparencia'
            className={`hover:underline transition-colors ${pathname === '/transparencia' ? 'underline font-semibold text-[#92400e] dark:text-orange-400' : 'hover:text-[#92400e] dark:hover:text-orange-400'}`}
            onClick={() => setOpenMenu(false)}
          >
            Transparencia
          </Link>
          <ThemeSwitcher />
          <Dialog open={openPix} onOpenChange={setOpenPix}>
            <DialogTrigger asChild>
              <Button
                variant='secondary'
                className='bg-[#92400e] text-white hover:bg-[#78350f] flex items-center gap-2 cursor-pointer'
              >
                <HandHeart className='w-4 h-4' />
                Apoie
              </Button>
            </DialogTrigger>
            <DialogContent className='bg-white dark:bg-black text-black dark:text-white max-w-sm text-center'>
              <DialogTitle className='text-lg font-semibold mb-4'>
                Apoie com Pix
              </DialogTitle>
              <Image
                src='https://nkualykoqttmxfbhydav.supabase.co/storage/v1/object/public/filhasDaTerra/qrcode.jpg'
                alt='QR Code para doação'
                width={250}
                height={250}
                className='mx-auto rounded'
              />
              <p className='text-sm mt-2'>
                Escaneie o QR Code para apoiar o Instituto.
              </p>
            </DialogContent>
          </Dialog>
        </nav>

        {/* Menu Mobile */}
        <div className='md:hidden flex items-center space-x-4'>
          <ThemeSwitcher />
          <Dialog open={openMenu} onOpenChange={setOpenMenu}>
            <DialogTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Menu className='w-6 h-6 text-black dark:text-white' />
              </Button>
            </DialogTrigger>
            <DialogContent className='bg-white dark:bg-black text-black dark:text-white max-w-xs'>
              <DialogTitle className='sr-only'>Menu</DialogTitle>
              <div className='flex flex-col gap-4 text-lg'>
                <Link
                  href='/'
                  className={`transition-colors ${pathname === '/' ? 'underline font-semibold text-[#92400e] dark:text-orange-400' : 'hover:text-[#92400e] dark:hover:text-orange-400'}`}
                  onClick={() => setOpenMenu(false)}
                >
                  Início
                </Link>
                <Link
                  href='/sobre'
                  className={`transition-colors ${pathname === '/sobre' ? 'underline font-semibold text-[#92400e] dark:text-orange-400' : 'hover:text-[#92400e] dark:hover:text-orange-400'}`}
                  onClick={() => setOpenMenu(false)}
                >
                  Quem Somos
                </Link>
                <Link
                  href='/projetos'
                  className={`transition-colors ${pathname === '/projetos' ? 'underline font-semibold text-[#92400e] dark:text-orange-400' : 'hover:text-[#92400e] dark:hover:text-orange-400'}`}
                  onClick={() => setOpenMenu(false)}
                >
                  Projetos
                </Link>
                <Link
                  href='/contatos'
                  className={`transition-colors ${pathname === '/contatos' ? 'underline font-semibold text-[#92400e] dark:text-orange-400' : 'hover:text-[#92400e] dark:hover:text-orange-400'}`}
                  onClick={() => setOpenMenu(false)}
                >
                  Contato
                </Link>
                <Link
                  href='/transparencia'
                  className={`transition-colors ${pathname === '/transparencia' ? 'underline font-semibold text-[#92400e] dark:text-orange-400' : 'hover:text-[#92400e] dark:hover:text-orange-400'}`}
                  onClick={() => setOpenMenu(false)}
                >
                  Transparencia
                </Link>
                <Button
                  className='bg-[#92400e] text-white hover:bg-[#78350f] w-full flex items-center gap-2'
                  onClick={() => setOpenPix(true)}
                >
                  <HandHeart className='w-4 h-4' />
                  Apoie
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
