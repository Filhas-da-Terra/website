'use client'
import Link from 'next/link'
import { IconBrandWhatsapp } from '@tabler/icons-react'

export default function Contato() {
  return (
    <div className='flex flex-col items-center justify-center mt-36'>
      <div className='w-full max-w-md mb-5'>
        <h1 className='text-4xl font-bold text-[#92400e] text-center dark:text-orange-400 mb-4'>
          Fale Conosco
        </h1>
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

      <div className='w-full max-w-md mt-8 mb-6 px-4'>
        <Link
          href='https://whatsapp.com/channel/0029VbBpxV023n3nfJJ55f32'
          target='_blank'
          rel='noopener noreferrer'
          className='block'
        >
          <div className='bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300'>
            <div className='flex items-center gap-3 mb-3'>
              <div className='flex-shrink-0'>
                <IconBrandWhatsapp className='w-8 h-8 text-green-600' />
              </div>
              <div className='flex-1'>
                <h2 className='text-lg font-bold text-green-800'>
                  🌱 Siga nosso Canal no WhatsApp!
                </h2>
              </div>
            </div>
            <p className='text-gray-700 text-sm mb-3 leading-relaxed'>
              Receba notícias, eventos e oportunidades que inspiram a
              transformação socioambiental.
            </p>
            <div className='text-center'>
              <span className='inline-block bg-green-600 text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-green-700 transition-colors'>
                💬 Seguir Canal
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
