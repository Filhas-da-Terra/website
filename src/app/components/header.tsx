'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from '@/components/ui/dialog';
import { HandHeart, Menu } from 'lucide-react';

export default function Header() {
  const [openPix, setOpenPix] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="bg-transparent text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/logoColorida.png" alt="Logo" width={50} height={50} />
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden md:flex items-center space-x-6 text-black">
          <Link href="/" className="hover:underline">Início</Link>
          <Link href="/about" className="hover:underline">Quem Somos</Link>
          <Link href="/projects" className="hover:underline">Projetos</Link>
          <Link href="/contact" className="hover:underline">Contato</Link>

          <Dialog open={openPix} onOpenChange={setOpenPix}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                className="bg-[#92400e] text-white hover:bg-[#78350f] flex items-center gap-2"
              >
                <HandHeart className="w-4 h-4" />
                Apoie
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black max-w-sm text-center">
              <DialogTitle className="text-lg font-semibold mb-4">Apoie com Pix</DialogTitle>
              <Image
                src="/qrcode.jpg"
                alt="QR Code para doação"
                width={250}
                height={250}
                className="mx-auto"
              />
              <p className="text-sm mt-2">Escaneie o QR Code para apoiar o Instituto.</p>
            </DialogContent>
          </Dialog>
        </nav>

        {/* Menu Mobile */}
        <div className="md:hidden">
          <Dialog open={openMenu} onOpenChange={setOpenMenu}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6 text-white" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black max-w-xs">
            <DialogTitle className="text-lg font-semibold mb-4">Apoie com Pix</DialogTitle>
              <div className="flex flex-col gap-4 text-lg">
                <Link href="/" onClick={() => setOpenMenu(false)}>Início</Link>
                <Link href="/about" onClick={() => setOpenMenu(false)}>Quem Somos</Link>
                <Link href="/projects" onClick={() => setOpenMenu(false)}>Projetos</Link>
                <Link href="/contact" onClick={() => setOpenMenu(false)}>Contato</Link>

                <Dialog open={openPix} onOpenChange={setOpenPix}>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-[#92400e] text-white hover:bg-[#78350f] w-full flex items-center gap-2"
                    >
                      <HandHeart className="w-4 h-4" />
                      Apoie
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white text-black max-w-sm text-center">
                    <DialogTitle className="text-lg font-semibold mb-4">Apoie com Pix </DialogTitle>
                    <Image
                      src="/qrcode.jpg"
                      alt="QR Code para doação"
                      width={250}
                      height={250}
                      className="mx-auto"
                    />
                    <p className="text-sm mt-2">Escaneie o QR Code para apoiar o Instituto.</p>
                  </DialogContent>
                </Dialog>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
}
