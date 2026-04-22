'use client'

import Image from 'next/image'
import { useState } from 'react'

const SDG_IMAGE_BASE =
  'https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br'

const SDG_NAMES: Record<number, string> = {
  1: 'Erradicação da pobreza',
  2: 'Fome zero e agricultura sustentável',
  3: 'Saúde e bem-estar',
  4: 'Educação de qualidade',
  5: 'Igualdade de gênero',
  6: 'Água potável e saneamento',
  7: 'Energia limpa e acessível',
  8: 'Trabalho decente e crescimento econômico',
  9: 'Indústria, inovação e infraestrutura',
  10: 'Redução das desigualdades',
  11: 'Cidades e comunidades sustentáveis',
  12: 'Consumo e produção responsáveis',
  13: 'Ação contra a mudança global do clima',
  14: 'Vida na água',
  15: 'Vida terrestre',
  16: 'Paz, justiça e instituições eficazes',
  17: 'Parcerias e meios de implementação',
}

type OdsRowDetail = {
  area: string
  targets: string[]
  contribution: string
}

const ODS_DETAILS: Record<number, OdsRowDetail[]> = {
  2: [
    {
      area: 'Socioambiental e Agroecologia',
      targets: [
        '2.4 – Garantir sistemas sustentáveis de produção de alimentos.',
      ],
      contribution:
        'Hortas comunitárias, reflorestamento de nascentes, preservação de sementes crioulas, oficinas de compostagem e economia circular.',
    },
  ],
  4: [
    {
      area: 'Educação Popular e Formação Comunitária',
      targets: [
        '4.7 – Garantir educação para o desenvolvimento sustentável e direitos humanos.',
      ],
      contribution:
        'Formação de educadores populares, oficinas com mulheres e juventudes, rodas de diálogo freirianas e círculos de cultura.',
    },
  ],
  5: [
    {
      area: 'Educação Popular e Formação Comunitária',
      targets: ['5.5 – Garantir participação plena e efetiva das mulheres.'],
      contribution:
        'Formação de educadores populares, oficinas com mulheres e juventudes, rodas de diálogo freirianas e círculos de cultura.',
    },
    {
      area: 'Ações de Justiça Racial e de Gênero',
      targets: [
        '5.1 – Acabar com todas as formas de discriminação contra mulheres e meninas.',
      ],
      contribution:
        'Educação antirracista, campanhas de enfrentamento ao racismo e à violência de gênero, apoio psicossocial e jurídico comunitário.',
    },
  ],
  8: [
    {
      area: 'Gestão Institucional e Comunitária',
      targets: ['8.3 – Promover o empreendedorismo e o emprego digno.'],
      contribution:
        'Fortalecimento de redes comunitárias (Ecofavela, hortas comunitárias), economia solidária, formação de lideranças femininas e jovens.',
    },
    {
      area: 'Turismo de Base Comunitária e Economia Solidária',
      targets: [
        '8.9 – Promover o turismo sustentável que valorize a cultura local.',
      ],
      contribution:
        'Roteiros ecológicos comunitários, feiras de sementes e produtos agroecológicos, capacitação em gestão solidária e circular.',
    },
  ],
  10: [
    {
      area: 'Educação Popular e Formação Comunitária',
      targets: ['10.2 – Promover inclusão social, econômica e política.'],
      contribution:
        'Formação de educadores populares, oficinas com mulheres e juventudes, rodas de diálogo freirianas e círculos de cultura.',
    },
    {
      area: 'Ações de Justiça Racial e de Gênero',
      targets: ['10.3 – Garantir igualdade de oportunidades.'],
      contribution:
        'Educação antirracista, campanhas de enfrentamento ao racismo e à violência de gênero, apoio psicossocial e jurídico comunitário.',
    },
  ],
  11: [
    {
      area: 'Cultura e Comunicação Popular',
      targets: [
        '11.4 – Fortalecer a proteção do patrimônio cultural e natural.',
      ],
      contribution:
        'Produção cultural periférica, arte-educação, comunicação comunitária, festivais (FACA), campanhas de mobilização e memória popular.',
    },
  ],
  12: [
    {
      area: 'Turismo de Base Comunitária e Economia Solidária',
      targets: [
        '12.5 – Reduzir a geração de resíduos através da prevenção, reciclagem e reuso.',
      ],
      contribution:
        'Roteiros ecológicos comunitários, feiras de sementes e produtos agroecológicos, capacitação em gestão solidária e circular.',
    },
  ],
  13: [
    {
      area: 'Socioambiental e Agroecologia',
      targets: [
        '13.3 – Melhorar a educação e conscientização sobre mitigação e adaptação climática.',
      ],
      contribution:
        'Hortas comunitárias, reflorestamento de nascentes, preservação de sementes crioulas, oficinas de compostagem e economia circular.',
    },
  ],
  15: [
    {
      area: 'Socioambiental e Agroecologia',
      targets: ['15.1 – Conservar ecossistemas terrestres e biodiversidade.'],
      contribution:
        'Hortas comunitárias, reflorestamento de nascentes, preservação de sementes crioulas, oficinas de compostagem e economia circular.',
    },
  ],
  16: [
    {
      area: 'Cultura e Comunicação Popular',
      targets: [
        '16.7 – Garantir processos decisórios participativos e inclusivos.',
      ],
      contribution:
        'Produção cultural periférica, arte-educação, comunicação comunitária, festivais (FACA), campanhas de mobilização e memória popular.',
    },
    {
      area: 'Ações de Justiça Racial e de Gênero',
      targets: ['16.b – Promover leis e políticas inclusivas.'],
      contribution:
        'Educação antirracista, campanhas de enfrentamento ao racismo e à violência de gênero, apoio psicossocial e jurídico comunitário.',
    },
  ],
  17: [
    {
      area: 'Gestão Institucional e Comunitária',
      targets: [
        '17.17 – Fomentar parcerias eficazes entre sociedade civil e governos.',
      ],
      contribution:
        'Fortalecimento de redes comunitárias (Ecofavela, hortas comunitárias), economia solidária, formação de lideranças femininas e jovens.',
    },
  ],
}

// Get only ODS numbers that have projects/data
const getAvailableODSNumbers = () => {
  return Object.keys(ODS_DETAILS)
    .map(Number)
    .sort((a, b) => a - b)
}

export function OdsSection() {
  const [selected, setSelected] = useState<number | null>(null)

  // Get available ODS numbers (only those with data)
  const availableODSNumbers = getAvailableODSNumbers()

  // If there are no ODS with data, don't render anything
  if (availableODSNumbers.length === 0) {
    return null
  }

  const blocks = selected != null ? ODS_DETAILS[selected] : undefined

  return (
    <section className='my-12 animate-fade-down animate-duration-1000 animate-delay-[2500ms]'>
      <h3 className='text-2xl font-bold text-black'>
        Objetivos de Desenvolvimento Sustentável (ODS)
      </h3>
      <p className='text-lg text-black mt-4'>
        Os ODS orientam nossa atuação alinhada à Agenda 2030. Ícones oficiais em
        português das{' '}
        <a
          href='https://brasil.un.org/pt-br/sdgs'
          className='underline text-emerald-800 hover:text-emerald-900'
          target='_blank'
          rel='noopener noreferrer'
        >
          Nações Unidas no Brasil
        </a>
        . Toque ou clique em um ODS para ver as metas específicas da ONU e a
        contribuição institucional correspondentes.
      </p>

      <div className='mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3'>
        {availableODSNumbers.map((n) => {
          const isSelected = selected === n
          return (
            <button
              key={n}
              type='button'
              onClick={() => setSelected(isSelected ? null : n)}
              className={`group cursor-pointer relative aspect-square w-full rounded-lg overflow-hidden border-2 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700 ${
                isSelected
                  ? 'border-emerald-700 shadow-md ring-2 ring-emerald-600/30'
                  : 'border-transparent hover:border-neutral-300 hover:shadow'
              }`}
              aria-pressed={isSelected}
              aria-label={`ODS ${n}: ${SDG_NAMES[n]}`}
            >
              <Image
                src={`${SDG_IMAGE_BASE}/SDG-${n}.svg`}
                alt=''
                fill
                className='object-cover bg-white'
                sizes='(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 16vw'
              />
            </button>
          )
        })}
      </div>

      <div
        className='mt-6 rounded-lg border border-neutral-200 bg-white/85 p-4 min-h-[5rem]'
        role='region'
        aria-live='polite'
        aria-label='Detalhes do ODS selecionado'
      >
        {selected == null ? (
          <p className='text-neutral-600 text-lg'>
            Selecione um ODS acima para ver metas da Agenda 2030 e contribuição
            institucional.
          </p>
        ) : (
          <>
            <p className='text-lg font-semibold text-black'>
              ODS {selected} — {SDG_NAMES[selected]}
            </p>
            {blocks && blocks.length > 0 ? (
              <div className='mt-4 space-y-8'>
                {blocks.map((row) => (
                  <article
                    key={`${row.area}-${row.targets[0]}`}
                    className='border-l-4 border-emerald-700 pl-4'
                  >
                    <h4 className='text-base font-semibold text-black'>
                      {row.area}
                    </h4>
                    <div className='mt-3'>
                      <p className='text-sm font-semibold uppercase tracking-wide text-neutral-600'>
                        Metas específicas da ONU (Agenda 2030)
                      </p>
                      <ul className='mt-2 list-disc list-outside ml-5 text-lg text-black space-y-1'>
                        {row.targets.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    </div>
                    <div className='mt-4'>
                      <p className='text-sm font-semibold uppercase tracking-wide text-neutral-600'>
                        Contribuição / Indicadores institucionais
                      </p>
                      <p className='mt-2 text-lg text-black leading-relaxed'>
                        {row.contribution}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className='mt-3 text-lg text-neutral-700'>
                Não há metas ou contribuições institucionais mapeadas para este
                ODS na nossa matriz atual. Consulte a página da{' '}
                <a
                  href='https://brasil.un.org/pt-br/sdgs'
                  className='underline text-emerald-800 hover:text-emerald-900'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  ONU Brasil sobre os ODS
                </a>{' '}
                para o contexto global do objetivo.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  )
}
