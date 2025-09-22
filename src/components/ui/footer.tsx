import Image from 'next/image'
import Link from 'next/link'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
} from '@tabler/icons-react'
export default function Footer() {
  return (
    <footer className='bg-[#4c1d95] text-white'>
      <div className='container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm'>
        <div>
          <div className='flex items-center mb-2'>
            <Image
              src='https://nkualykoqttmxfbhydav.supabase.co/storage/v1/object/public/filhasDaTerra/logoBranca.png'
              alt='Logo'
              width={50}
              height={50}
              className='mr-4'
            />
            <h4 className='text-lg font-semibold'>Instituto Filhas da Terra</h4>
          </div>
          <p>
            Organização sem fins lucrativos com atuação em Ceilândia e Sol
            Nascente, promovendo justiça socioambiental com foco em mulheres
            negras e pessoas LGBTQIAPN+.
          </p>
        </div>
        <div>
          <h4 className='text-lg font-semibold mb-2'>Contato</h4>
          <p>Email: institutofilhasdaterra@gmail.com</p>
          <p>Parque da Lagoinha CH 16, Trecho 3 do Sol Nascente</p>
        </div>
        <div>
          <h4 className='text-lg font-semibold mb-2'>Redes Sociais</h4>
          <div className='flex space-x-4 mt-2'>
            <Link
              href='https://www.instagram.com/institutofilhasdaterra/'
              title='Instagram'
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconBrandInstagram className='w-6 h-6' />
            </Link>
            <Link
              href='https://facebook.com/coletivafilhasdaterra'
              title='Facebook'
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconBrandFacebook className='w-6 h-6' />
            </Link>
            <Link
              href='https://x.com/FilhasTerra'
              title='x'
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconBrandX className='w-6 h-6' />
            </Link>
            <Link
              href='https://www.youtube.com/channel/UC56htIaWgV4HF3rTYSsMSzQ'
              title='Youtube'
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconBrandYoutube className='w-6 h-6' />
            </Link>
            <Link
              href='https://www.tiktok.com/@filhasdaterra?'
              title='Tiktok'
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconBrandTiktok className='w-6 h-6' />
            </Link>
          </div>
        </div>
      </div>
      <div className='bg-[#92400e] text-center py-4 text-sm'>
        &copy; {new Date().getFullYear()} Instituto Filhas da Terra. Todos os
        direitos reservados.
      </div>
    </footer>
  )
}
