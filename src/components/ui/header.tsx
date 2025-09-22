'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
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
          <Link href='/' className='hover:underline'>
            Início
          </Link>
          <Link href='/sobre' className='hover:underline'>
            Quem Somos
          </Link>
          <Link href='/projetos' className='hover:underline'>
            Projetos
          </Link>
          <Link href='/contatos' className='hover:underline'>
            Contato
          </Link>
          <Link href='/transparencia' onClick={() => setOpenMenu(false)}>
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
                <Link href='/' onClick={() => setOpenMenu(false)}>
                  Início
                </Link>
                <Link href='/sobre' onClick={() => setOpenMenu(false)}>
                  Quem Somos
                </Link>
                <Link href='/projetos' onClick={() => setOpenMenu(false)}>
                  Projetos
                </Link>
                <Link href='/contatos' onClick={() => setOpenMenu(false)}>
                  Contato
                </Link>
                <Link href='/transparencia' onClick={() => setOpenMenu(false)}>
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
