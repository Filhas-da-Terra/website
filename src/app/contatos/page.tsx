'use client'
import Link from 'next/link'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube,
} from '@tabler/icons-react'

export default function Contato() {
  return (
    <div className='flex flex-col items-center justify-center mt-36'>
      <div className='w-full max-w-md mb-5'>
        <h1 className='text-2xl font-bold mb-4 text-center'>Fale Conosco</h1>
        <p className='text-center'>
          Entre em contato conosco pelo email:{' '}
          <Link
            href='mailto:institutofilhasdaterra@gmail.com'
            className='text-purple-800 underline'
          >
            institutofilhasdaterra@gmail.com
          </Link>
        </p>
      </div>

      <div className='space-y-4 flex flex-col items-center justify-center'>
        <h2 className='text-xl font-bold'>Siga-nos</h2>
        <div className='flex space-x-4'>
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
  )
}
