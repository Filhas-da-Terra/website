'use client'

import { useRef } from 'react'
import Logo from '@/components/ui/logo'

export default function VisualIdentityPage() {
  const contentRef = useRef<HTMLDivElement>(null)

  const downloadPDF = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  return (
    <div className='min-h-screen bg-white p-8'>
      <div ref={contentRef} className='max-w-4xl mx-auto bg-white'>
        {/* Cover Page */}
        <div className='text-center mb-16'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Manual de Identidade Visual
          </h1>
          <h2 className='text-2xl text-gray-700 mb-8'>
            Instituto Filhas da Terra
          </h2>
          <div className='w-32 h-32 mx-auto mb-8 bg-gray-100 rounded-lg flex items-center justify-center'>
            <Logo width={80} height={80} color='#000000' />
          </div>
          <p className='text-gray-600'>
            Justiça Socioambiental nas Periferias do Distrito Federal
          </p>
        </div>

        {/* Table of Contents */}
        <div className='mb-16'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Índice</h2>
          <ul className='space-y-2 text-gray-700'>
            <li>1. Introdução</li>
            <li>2. Paleta de Cores</li>
            <li>3. Tipografia</li>
            <li>4. Logo e Marca</li>
            <li>5. Aplicações</li>
            <li>6. Diretrizes de Uso</li>
          </ul>
        </div>

        {/* Introduction */}
        <div className='mb-16'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            1. Introdução
          </h2>
          <p className='text-gray-700 mb-4'>
            Este manual apresenta as diretrizes de identidade visual do
            Instituto Filhas da Terra, uma organização sem fins lucrativos
            dedicada à justiça socioambiental nas periferias do Distrito
            Federal.
          </p>
          <p className='text-gray-700'>
            A identidade visual foi desenvolvida para refletir os valores de
            sustentabilidade, justiça social e conexão com a terra, utilizando
            cores e elementos que remetem à natureza e ao cerrado brasileiro.
          </p>
        </div>

        {/* Color Palette */}
        <div className='mb-16'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            2. Paleta de Cores
          </h2>

          {/* Primary Colors */}
          <div className='mb-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Cores Primárias
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='text-center'>
                <div
                  className='w-24 h-24 mx-auto mb-2 rounded-lg'
                  style={{ backgroundColor: '#7b4f30' }}
                ></div>
                <p className='text-sm font-medium'>Terra</p>
                <p className='text-xs text-gray-600'>#7b4f30</p>
              </div>
              <div className='text-center'>
                <div
                  className='w-24 h-24 mx-auto mb-2 rounded-lg'
                  style={{ backgroundColor: '#40513b' }}
                ></div>
                <p className='text-sm font-medium'>Cerrado</p>
                <p className='text-xs text-gray-600'>#40513b</p>
              </div>
              <div className='text-center'>
                <div
                  className='w-24 h-24 mx-auto mb-2 rounded-lg'
                  style={{ backgroundColor: '#9dc08b' }}
                ></div>
                <p className='text-sm font-medium'>Verde Claro</p>
                <p className='text-xs text-gray-600'>#9dc08b</p>
              </div>
              <div className='text-center'>
                <div
                  className='w-24 h-24 mx-auto mb-2 rounded-lg'
                  style={{ backgroundColor: '#f0ead2' }}
                ></div>
                <p className='text-sm font-medium'>Areia</p>
                <p className='text-xs text-gray-600'>#f0ead2</p>
              </div>
            </div>
          </div>

          {/* System Colors */}
          <div className='mb-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Cores do Sistema
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='text-center'>
                <div className='w-24 h-24 mx-auto mb-2 rounded-lg bg-gray-900'></div>
                <p className='text-sm font-medium'>Preto</p>
                <p className='text-xs text-gray-600'>#000000</p>
              </div>
              <div className='text-center'>
                <div className='w-24 h-24 mx-auto mb-2 rounded-lg bg-white border border-gray-300'></div>
                <p className='text-sm font-medium'>Branco</p>
                <p className='text-xs text-gray-600'>#FFFFFF</p>
              </div>
              <div className='text-center'>
                <div className='w-24 h-24 mx-auto mb-2 rounded-lg bg-gray-100'></div>
                <p className='text-sm font-medium'>Cinza Claro</p>
                <p className='text-xs text-gray-600'>#F4F4F5</p>
              </div>
              <div className='text-center'>
                <div className='w-24 h-24 mx-auto mb-2 rounded-lg bg-gray-800'></div>
                <p className='text-sm font-medium'>Cinza Escuro</p>
                <p className='text-xs text-gray-600'>#1E293B</p>
              </div>
            </div>
          </div>

          {/* Footer Colors */}
          <div className='mb-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Cores do Footer
            </h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <div className='text-center'>
                <div
                  className='w-24 h-24 mx-auto mb-2 rounded-lg'
                  style={{ backgroundColor: '#4c1d95' }}
                ></div>
                <p className='text-sm font-medium'>Roxo Footer</p>
                <p className='text-xs text-gray-600'>#4c1d95</p>
              </div>
              <div className='text-center'>
                <div
                  className='w-24 h-24 mx-auto mb-2 rounded-lg'
                  style={{ backgroundColor: '#92400e' }}
                ></div>
                <p className='text-sm font-medium'>Marrom Copyright</p>
                <p className='text-xs text-gray-600'>#92400e</p>
              </div>
            </div>
          </div>

          {/* Color Usage Guidelines */}
          <div className='bg-gray-50 p-6 rounded-lg'>
            <h4 className='text-lg font-semibold text-gray-800 mb-3'>
              Diretrizes de Uso das Cores
            </h4>
            <ul className='space-y-2 text-gray-700 text-sm'>
              <li>
                • <strong>Preto (#000000):</strong> Cor principal para logo e
                textos, garante melhor contraste
              </li>
              <li>
                • <strong>Terra (#7b4f30):</strong> Cor secundária, use para
                elementos de destaque e CTAs
              </li>
              <li>
                • <strong>Cerrado (#40513b):</strong> Cor terciária, ideal para
                textos secundários
              </li>
              <li>
                • <strong>Verde Claro (#9dc08b):</strong> Cor de apoio, use para
                highlights e elementos decorativos
              </li>
              <li>
                • <strong>Areia (#f0ead2):</strong> Cor de fundo, ideal para
                seções e cards
              </li>
              <li>
                • <strong>Roxo Footer (#4c1d95):</strong> Cor do footer
                principal, use para fundos de seções importantes
              </li>
              <li>
                • <strong>Marrom Copyright (#92400e):</strong> Cor do rodapé de
                copyright, use para elementos de destaque secundário
              </li>
            </ul>
          </div>
        </div>

        {/* Typography */}
        <div className='mb-16'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            3. Tipografia
          </h2>

          <div className='mb-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Fonte Principal
            </h3>
            <div className='bg-gray-50 p-6 rounded-lg'>
              <p
                className='text-2xl font-bold mb-2'
                style={{ fontFamily: 'Urbanist, sans-serif' }}
              >
                Urbanist Bold
              </p>
              <p
                className='text-lg mb-2'
                style={{ fontFamily: 'Urbanist, sans-serif' }}
              >
                Urbanist Regular
              </p>
              <p
                className='text-sm text-gray-600'
                style={{ fontFamily: 'Urbanist, sans-serif' }}
              >
                Urbanist Light
              </p>
            </div>
          </div>

          <div className='mb-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Hierarquia Tipográfica
            </h3>
            <div className='space-y-4'>
              <div>
                <h1 className='text-4xl font-bold text-gray-900 mb-2'>
                  Título Principal (H1)
                </h1>
                <p className='text-sm text-gray-600'>
                  40px / Bold / Cor: Preto
                </p>
              </div>
              <div>
                <h2 className='text-3xl font-bold text-gray-900 mb-2'>
                  Título Secundário (H2)
                </h2>
                <p className='text-sm text-gray-600'>
                  32px / Bold / Cor: Preto
                </p>
              </div>
              <div>
                <h3 className='text-2xl font-semibold text-gray-900 mb-2'>
                  Título Terciário (H3)
                </h3>
                <p className='text-sm text-gray-600'>
                  24px / Semibold / Cor: Preto
                </p>
              </div>
              <div>
                <p className='text-lg text-gray-700 mb-2'>Texto Principal</p>
                <p className='text-sm text-gray-600'>
                  18px / Regular / Cor: Cinza Escuro
                </p>
              </div>
              <div>
                <p className='text-base text-gray-600 mb-2'>Texto Secundário</p>
                <p className='text-sm text-gray-600'>
                  16px / Regular / Cor: Cinza Médio
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Logo and Brand */}
        <div className='mb-16'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            4. Logo e Marca
          </h2>

          <div className='mb-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Logo Principal
            </h3>
            <div className='bg-gray-50 p-8 rounded-lg flex justify-center items-center flex-col'>
              <div className='mx-auto mb-4'>
                <Logo width={200} height={200} color='#000000' />
              </div>
              <p className='text-sm text-gray-600'>
                Versão em preto para melhor contraste
              </p>
            </div>
          </div>

          <div className='mb-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Variações do Logo
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className='bg-gray-900 p-6 rounded-lg flex justify-center items-center flex-col'>
                <div className='mx-auto mb-2'>
                  <Logo width={120} height={120} color='#FFFFFF' />
                </div>
                <p className='text-sm text-white'>Versão Branca</p>
              </div>
              <div className='bg-white border border-gray-300 p-6 rounded-lg flex justify-center items-center flex-col'>
                <div className='mx-auto mb-2'>
                  <Logo width={120} height={120} color='#000000' />
                </div>
                <p className='text-sm text-gray-600'>Versão Preta</p>
              </div>
              <div className='bg-gray-100 p-6 rounded-lg flex justify-center items-center flex-col'>
                <div className='mx-auto mb-2'>
                  <Logo width={120} height={120} color='#000000' />
                </div>
                <p className='text-sm text-gray-600'>
                  Versão Preta (fundo claro)
                </p>
              </div>
            </div>
          </div>

          <div className='bg-red-50 border border-red-200 p-6 rounded-lg'>
            <h4 className='text-lg font-semibold text-red-800 mb-3'>
              ⚠️ Uso Incorreto do Logo
            </h4>
            <ul className='space-y-2 text-red-700 text-sm'>
              <li>• Não distorcer ou alterar as proporções</li>
              <li>• Não usar cores que não estejam na paleta oficial</li>
              <li>• Não adicionar elementos decorativos ao logo</li>
              <li>• Manter sempre a área de respiro mínima</li>
            </ul>
          </div>
        </div>

        {/* Applications */}
        <div className='mb-16'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            5. Aplicações
          </h2>

          <div className='mb-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Cartão de Visita
            </h3>
            <div className='bg-gray-50 p-8 rounded-lg'>
              <div className='w-80 h-48 mx-auto bg-white border border-gray-300 rounded-lg p-6 shadow-lg'>
                <div className='flex items-center mb-4'>
                  <div className='mr-3'>
                    <Logo width={40} height={40} color='#000000' />
                  </div>
                  <div>
                    <h4 className='font-bold text-gray-900'>
                      Instituto Filhas da Terra
                    </h4>
                    <p className='text-sm text-gray-600'>
                      Justiça Socioambiental
                    </p>
                  </div>
                </div>
                <div className='text-sm text-gray-700'>
                  <p>contato@filhasdaterra.org.br</p>
                  <p>Brasília - DF</p>
                </div>
              </div>
            </div>
          </div>

          <div className='mb-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Cabeçalho de Documento
            </h3>
            <div className='bg-gray-50 p-8 rounded-lg'>
              <div className='bg-white border border-gray-300 rounded-lg p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center'>
                    <div className='mr-3'>
                      <Logo width={32} height={32} color='#000000' />
                    </div>
                    <div>
                      <h4 className='font-bold text-gray-900'>
                        Instituto Filhas da Terra
                      </h4>
                      <p className='text-sm text-gray-600'>
                        Justiça Socioambiental
                      </p>
                    </div>
                  </div>
                  <div className='text-right text-sm text-gray-600'>
                    <p>Brasília - DF</p>
                    <p>contato@filhasdaterra.org.br</p>
                  </div>
                </div>
                <div className='border-t border-gray-200 pt-4'>
                  <h3 className='text-lg font-semibold text-gray-900'>
                    Relatório Anual 2024
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Atividades e Resultados
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='mb-8'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4'>
              Footer do Site
            </h3>
            <div className='bg-gray-50 p-8 rounded-lg'>
              <div className='rounded-lg overflow-hidden shadow-lg'>
                <div
                  className='p-6 text-white'
                  style={{ backgroundColor: '#4c1d95' }}
                >
                  <div className='flex items-center mb-4'>
                    <div className='mr-3'>
                      <Logo width={40} height={40} color='#FFFFFF' />
                    </div>
                    <div>
                      <h4 className='text-lg font-semibold'>
                        Instituto Filhas da Terra
                      </h4>
                      <p className='text-sm opacity-90'>
                        Justiça Socioambiental
                      </p>
                    </div>
                  </div>
                  <p className='text-sm opacity-90 mb-4'>
                    Organização sem fins lucrativos com atuação em Ceilândia e
                    Sol Nascente, promovendo justiça socioambiental.
                  </p>
                  <div className='text-sm'>
                    <p>Email: institutofilhasdaterra@gmail.com</p>
                    <p>Brasília - DF</p>
                  </div>
                </div>
                <div
                  className='text-center py-3 text-sm text-white'
                  style={{ backgroundColor: '#92400e' }}
                >
                  © 2024 Instituto Filhas da Terra. Todos os direitos
                  reservados.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className='mb-16'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>
            6. Diretrizes de Uso
          </h2>

          <div className='space-y-6'>
            <div className='bg-green-50 border border-green-200 p-6 rounded-lg'>
              <h4 className='text-lg font-semibold text-green-800 mb-3'>
                ✅ Uso Correto
              </h4>
              <ul className='space-y-2 text-green-700 text-sm'>
                <li>
                  • Use preto para o logo em fundos claros para melhor contraste
                </li>
                <li>• Use branco para o logo em fundos escuros</li>
                <li>• Mantenha a proporção original do logo</li>
                <li>• Use a tipografia Urbanist em todos os materiais</li>
                <li>• Respeite a área de respiro ao redor do logo</li>
                <li>• Mantenha consistência visual em todos os materiais</li>
              </ul>
            </div>

            <div className='bg-red-50 border border-red-200 p-6 rounded-lg'>
              <h4 className='text-lg font-semibold text-red-800 mb-3'>
                ❌ Uso Incorreto
              </h4>
              <ul className='space-y-2 text-red-700 text-sm'>
                <li>
                  • Não use cores com baixo contraste (ex: cinza claro em fundo
                  branco)
                </li>
                <li>• Não distorça ou redimensione incorretamente</li>
                <li>• Não use fontes diferentes da Urbanist</li>
                <li>• Não adicione elementos decorativos ao logo</li>
                <li>• Não use cores que não estejam na paleta oficial</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className='border-t border-gray-200 pt-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-6'>Contato</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                Instituto Filhas da Terra
              </h3>
              <p className='text-gray-700 mb-2'>Justiça Socioambiental</p>
              <p className='text-gray-700 mb-2'>Brasília - Distrito Federal</p>
              <p className='text-gray-700'>contato@filhasdaterra.org.br</p>
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-800 mb-3'>
                Arquivos de Design
              </h3>
              <p className='text-gray-700 mb-2'>Logo em alta resolução</p>
              <p className='text-gray-700 mb-2'>
                Paleta de cores em formato digital
              </p>
              <p className='text-gray-700'>Templates de documentos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className='fixed bottom-8 right-8'>
        <button
          onClick={downloadPDF}
          className='bg-[#7b4f30] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#6a4328] transition-colors'
        >
          Baixar PDF
        </button>
      </div>

      <style jsx global>{`
        @media print {
          .fixed {
            display: none !important;
          }
          body {
            margin: 0;
            padding: 0;
          }
          .max-w-4xl {
            max-width: none;
          }
          .mb-16 {
            margin-bottom: 2rem;
          }
          .mb-8 {
            margin-bottom: 1.5rem;
          }
          .mb-6 {
            margin-bottom: 1rem;
          }
          .mb-4 {
            margin-bottom: 0.75rem;
          }
          .mb-2 {
            margin-bottom: 0.5rem;
          }
          .space-y-6 > * + * {
            margin-top: 1.5rem;
          }
          .space-y-4 > * + * {
            margin-top: 1rem;
          }
          .space-y-2 > * + * {
            margin-top: 0.5rem;
          }
          .grid {
            display: grid;
          }
          .grid-cols-1 {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }
          .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .grid-cols-4 {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
          .gap-4 {
            gap: 1rem;
          }
          .gap-6 {
            gap: 1.5rem;
          }
          .text-center {
            text-align: center;
          }
          .text-right {
            text-align: right;
          }
          .font-bold {
            font-weight: 700;
          }
          .font-semibold {
            font-weight: 600;
          }
          .text-4xl {
            font-size: 2.25rem;
            line-height: 2.5rem;
          }
          .text-3xl {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
          .text-2xl {
            font-size: 1.5rem;
            line-height: 2rem;
          }
          .text-xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
          }
          .text-lg {
            font-size: 1.125rem;
            line-height: 1.75rem;
          }
          .text-base {
            font-size: 1rem;
            line-height: 1.5rem;
          }
          .text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
          .text-xs {
            font-size: 0.75rem;
            line-height: 1rem;
          }
          .text-gray-900 {
            color: #111827;
          }
          .text-gray-800 {
            color: #1f2937;
          }
          .text-gray-700 {
            color: #374151;
          }
          .text-gray-600 {
            color: #4b5563;
          }
          .text-white {
            color: #ffffff;
          }
          .text-green-800 {
            color: #166534;
          }
          .text-green-700 {
            color: #15803d;
          }
          .text-red-800 {
            color: #991b1b;
          }
          .text-red-700 {
            color: #b91c1c;
          }
          .bg-white {
            background-color: #ffffff;
          }
          .bg-gray-50 {
            background-color: #f9fafb;
          }
          .bg-gray-100 {
            background-color: #f3f4f6;
          }
          .bg-gray-900 {
            background-color: #111827;
          }
          .bg-green-50 {
            background-color: #f0fdf4;
          }
          .bg-red-50 {
            background-color: #fef2f2;
          }
          .border {
            border-width: 1px;
          }
          .border-gray-200 {
            border-color: #e5e7eb;
          }
          .border-gray-300 {
            border-color: #d1d5db;
          }
          .border-green-200 {
            border-color: #bbf7d0;
          }
          .border-red-200 {
            border-color: #fecaca;
          }
          .rounded-lg {
            border-radius: 0.5rem;
          }
          .p-6 {
            padding: 1.5rem;
          }
          .p-8 {
            padding: 2rem;
          }
          .px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
          .py-3 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          .mb-2 {
            margin-bottom: 0.5rem;
          }
          .mb-3 {
            margin-bottom: 0.75rem;
          }
          .mb-4 {
            margin-bottom: 1rem;
          }
          .mb-6 {
            margin-bottom: 1.5rem;
          }
          .mb-8 {
            margin-bottom: 2rem;
          }
          .mb-16 {
            margin-bottom: 4rem;
          }
          .mr-3 {
            margin-right: 0.75rem;
          }
          .mx-auto {
            margin-left: auto;
            margin-right: auto;
          }
          .w-24 {
            width: 6rem;
          }
          .h-24 {
            height: 6rem;
          }
          .w-32 {
            width: 8rem;
          }
          .h-32 {
            height: 8rem;
          }
          .w-80 {
            width: 20rem;
          }
          .h-48 {
            height: 12rem;
          }
          .w-40 {
            width: 10rem;
          }
          .h-40 {
            height: 10rem;
          }
          .w-120 {
            width: 30rem;
          }
          .h-120 {
            height: 30rem;
          }
          .shadow-lg {
            box-shadow:
              0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }
          .flex {
            display: flex;
          }
          .items-center {
            align-items: center;
          }
          .justify-between {
            justify-content: space-between;
          }
          .flex-col {
            flex-direction: column;
          }
          .min-h-screen {
            min-height: 100vh;
          }
          .max-w-4xl {
            max-width: 56rem;
          }
          .border-t {
            border-top-width: 1px;
          }
          .pt-4 {
            padding-top: 1rem;
          }
          .pt-8 {
            padding-top: 2rem;
          }
          .list-disc {
            list-style-type: disc;
          }
          .list-inside {
            list-style-position: inside;
          }
        }
      `}</style>
    </div>
  )
}
