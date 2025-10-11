'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  FileText,
  ExternalLink,
  Users,
  FileCheck,
  Globe,
  Music,
  AlertTriangle,
} from 'lucide-react'

export default function ConteudosPage() {
  const [activeFilter, setActiveFilter] = useState('Todos')

  const contentItems = [
    {
      id: 9,
      title: 'Jardim do Bioma Cerrado recebe novas espécies nativas',
      description: 'Plantio de espécies nativas do Cerrado',
      content:
        'Iniciativa de plantio de 70 mudas de espécies nativas do Cerrado na sede do Ibama, promovendo a refloração e refaunação em celebração ao Dia do Cerrado e Dia da Árvore.',
      category: 'Documento',
      icon: FileText,
      link: '/novas-especies.pdf',
      linkText: 'Visualizar',
    },
    {
      id: 1,
      title: 'Cadastro de Voluntários',
      description: 'Junte-se ao Instituto Filhas da Terra',
      content:
        'Faça parte da nossa rede de voluntários e contribua com a justiça socioambiental no DF.',
      category: 'Cadastro',
      icon: Users,
      link: 'https://docs.google.com/forms/d/e/1FAIpQLSfsz2uX5EtdUm0K4mjZQJXKmPgDC8WTZTIGcySCG19yHjr57w/viewform?pli=1',
      linkText: 'Cadastrar',
    },
    {
      id: 2,
      title: 'CRIAÇÃO DO PARQUE ECOLÓGICO E DESPOLUIÇÃO DO RIO MELCHIOR',
      description: 'Luta pela preservação do Rio Melchior',
      content:
        'Petição para criação de parque ecológico e despoluição do Rio Melchior no Distrito Federal.',
      category: 'Petição',
      icon: AlertTriangle,
      link: 'https://secure.avaaz.org/community_petitions/po/coletivo_filhas_da_terra_queremos_um_parque_ecologico_na_ceilandia_e_a_despoluicao_do_rio_melchior_urgente/?fpla',
      linkText: 'Assinar',
    },
    {
      id: 3,
      title: 'Racismo Ambiental e a poluição do Rio Melchior',
      description: 'Pesquisa acadêmica sobre justiça ambiental',
      content:
        'A pesquisa tem como propósito relacionar racismo ambiental e a realidade da população próxima ao Rio Melchior/Belchior, fazendo um eco história de como foi o processo de construção das periferias que fazem parte do território.',
      category: 'Documento',
      icon: FileText,
      link: 'https://bdm.unb.br/handle/10483/37840',
      linkText: 'Ler',
    },
    {
      id: 4,
      title: 'Portfólio',
      description: 'Projetos e iniciativas do Instituto',
      content:
        'Conheça os projetos desenvolvidos pelo Instituto Filhas da Terra e seus impactos.',
      category: 'Portfólio',
      icon: FileCheck,
      link: 'https://www.canva.com/design/DAE_B0rrBSY/xl-B3z7BQ26IN7pIbDy1Fg/edit?utm_content=DAE_B0rrBSY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
      linkText: 'Ver Portfólio',
    },
    {
      id: 5,
      title: 'Ocupa Lagoinha: Movimentos emergentes de resiliência',
      description: 'Pesquisa sobre movimentos de resistência',
      content:
        'Movimento de resistência pela efetivação das políticas de proteção de nascentes no Distrito Federal.',
      category: 'Documento',
      icon: FileText,
      link: 'https://publicacoes.amigosdanatureza.org.br/index.php/anap/en/article/view/4152/3992',
      linkText: 'Conhecer',
    },
    {
      id: 6,
      title: 'A Luta Continua - Parte 2',
      description: 'Videoclipe musical de resistência',
      content:
        'Videoclipe musical que expressa a resistência e luta por justiça socioambiental.',
      category: 'Videoclipe',
      icon: Music,
      link: 'https://youtu.be/PfDdPw_LfGA?si=RAVDz3jggsHrgHlM',
      linkText: 'Assistir',
    },
    {
      id: 7,
      title: 'O Colapso dos Rios do DF',
      description: 'Seminário sobre crise hídrica',
      content:
        'Documentário que retrata a situação crítica dos rios e nascentes no Distrito Federal.',
      category: 'Seminário',
      icon: Globe,
      link: 'https://youtu.be/sYZWI92OcGs',
      linkText: 'Assistir',
    },
    {
      id: 8,
      title: 'Seminário Ambiental',
      description: 'Discussão sobre questões ambientais',
      content:
        'Seminário para discussão de questões ambientais e propostas de soluções sustentáveis.',
      category: 'Seminário',
      icon: Globe,
      link: 'https://youtu.be/LyNE8xCNjz4',
      linkText: 'Participar',
    },
  ]

  const categories = [
    'Todos',
    'Cadastro',
    'Petição',
    'Documento',
    'Portfólio',
    'Videoclipe',
    'Seminário',
  ]

  const filteredItems =
    activeFilter === 'Todos'
      ? contentItems
      : contentItems.filter((item) => item.category === activeFilter)
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-[#92400e] dark:text-orange-400 mb-4'>
          Conteúdos
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
          Acesse oficinas, vídeos, documentos, movimentos e campanhas do
          Instituto Filhas da Terra para justiça socioambiental no DF.
        </p>
      </div>

      {/* Filtros */}
      <div className='flex flex-wrap gap-4 mb-8 justify-center'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
              activeFilter === category
                ? 'bg-[#92400e] text-white hover:bg-[#78350f]'
                : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredItems.map((item) => {
          const IconComponent = item.icon
          return (
            <Card
              key={item.id}
              className='hover:shadow-lg transition-shadow duration-300'
            >
              <CardHeader>
                <div className='flex items-center gap-2 mb-2'>
                  <IconComponent className='w-5 h-5 text-[#92400e] dark:text-orange-400' />
                  <span className='text-sm text-gray-500 dark:text-gray-400'>
                    {item.category}
                  </span>
                </div>
                <CardTitle className='text-[#92400e] dark:text-orange-400'>
                  {item.title}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className='text-sm text-gray-700 dark:text-gray-300 mb-4'>
                  {item.content}
                </p>
                <div className='flex gap-2'>
                  <a
                    href={item.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center gap-2 px-3 py-2 bg-[#92400e] text-white rounded-lg hover:bg-[#78350f] transition-colors text-sm'
                  >
                    <ExternalLink className='w-4 h-4' />
                    {item.linkText}
                  </a>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Seção de Newsletter */}
      {/* <div className='mt-16'>
        <div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center'>
          <h2 className='text-2xl font-bold text-[#92400e] dark:text-orange-400 mb-4'>
            Receba Novos Conteúdos
          </h2>
          <p className='text-gray-600 dark:text-gray-300 mb-6'>
            Cadastre-se para receber notificações sobre novos materiais,
            relatórios e publicações.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto'>
            <input
              type='email'
              placeholder='Seu e-mail'
              className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#92400e] dark:focus:ring-orange-400'
            />
            <button className='px-6 py-2 bg-[#92400e] text-white rounded-lg hover:bg-[#78350f] transition-colors'>
              Cadastrar
            </button>
          </div>
        </div>
      </div> */}
    </div>
  )
}
