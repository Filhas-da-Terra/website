'use client'
import Link from 'next/link'
import { IconBrandWhatsapp, IconMail } from '@tabler/icons-react'

export default function Contato() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh] px-4 py-16'>
      <div className='w-full max-w-4xl'>
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 mb-4'>
            <h1 className='text-5xl font-bold text-[#92400e] dark:text-orange-400'>
              Fale Conosco
            </h1>
          </div>
        </div>

        <div className='grid md:grid-cols-1 gap-8 mb-8'>
          {/* Email Card */}
          <div className='bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-400 dark:border-purple-600 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105'>
            <div className='flex flex-col md:flex-row items-center gap-6'>
              <div className='flex-shrink-0 bg-purple-100 dark:bg-purple-800 p-6 rounded-full'>
                <IconMail className='w-12 h-12 text-purple-600 dark:text-purple-300' />
              </div>
              <div className='flex-1 text-center md:text-left'>
                <h2 className='text-2xl font-bold text-purple-800 dark:text-purple-300 mb-3'>
                  📧 Envie um E-mail
                </h2>
                <p className='text-gray-700 dark:text-gray-300 mb-4 text-lg leading-relaxed'>
                  Tem alguma dúvida, sugestão ou quer conhecer melhor nosso
                  trabalho? Envie uma mensagem para nossa equipe!
                </p>
                <Link
                  href='mailto:institutofilhasdaterra@gmail.com'
                  className='inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl'
                >
                  <IconMail className='w-5 h-5' />
                  institutofilhasdaterra@gmail.com
                </Link>
              </div>
            </div>
          </div>

          <div className='bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-500 dark:border-green-600 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105'>
            <Link
              href='https://whatsapp.com/channel/0029VbBpxV023n3nfJJ55f32'
              target='_blank'
              rel='noopener noreferrer'
              className='block'
            >
              <div className='flex flex-col md:flex-row items-center gap-6'>
                <div className='flex-shrink-0 bg-green-100 dark:bg-green-800 p-6 rounded-full'>
                  <IconBrandWhatsapp className='w-12 h-12 text-green-600 dark:text-green-300' />
                </div>
                <div className='flex-1 text-center md:text-left'>
                  <h2 className='text-2xl font-bold text-green-800 dark:text-green-300 mb-3'>
                    🌱 Siga nosso Canal no WhatsApp!
                  </h2>
                  <p className='text-gray-700 dark:text-gray-300 mb-4 text-lg leading-relaxed'>
                    Receba em primeira mão notícias, eventos e oportunidades que
                    inspiram a transformação socioambiental. Junte-se à nossa
                    comunidade!
                  </p>
                  <div className='inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl'>
                    <IconBrandWhatsapp className='w-5 h-5' />
                    Seguir Canal
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
