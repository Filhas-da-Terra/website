import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  Users,
  Leaf,
  Sprout,
} from 'lucide-react'
import Link from 'next/link'
import EventCalendar from '@/components/ui/event-calendar'

export default function CompostagemHortasPage() {
  // All events data
  const events = [
    {
      id: 1,
      name: 'Mutirão Lagoinha',
      date: new Date(2025, 9, 11),
      color: 'bg-blue-500',
    },
    {
      id: 2,
      name: 'Dia das Crianças',
      date: new Date(2025, 9, 19),
      color: 'bg-pink-500',
    },
    {
      id: 3,
      name: 'Feira de Sementes',
      date: new Date(2025, 10, 1),
      color: 'bg-[#92400e]',
    },
    {
      id: 4,
      name: 'Oficina: Compostagem e Hortas',
      date: new Date(2025, 10, 6),
      color: 'bg-green-500',
    },
  ]

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Breadcrumb */}
      <div className='mb-6'>
        <Link
          href='/eventos'
          className='inline-flex items-center gap-2 text-[#92400e] dark:text-orange-400 hover:underline'
        >
          <ArrowLeft className='w-4 h-4' />
          Voltar para Eventos
        </Link>
      </div>

      {/* Event Header */}
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-[#92400e] dark:text-orange-400 mb-4'>
          🌱 Oficina: Compostagem e Hortas Comunitárias 🌿
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
          Workshop promovido pela Adasa sobre compostagem descentralizada e
          fortalecimento de hortas comunitárias, com participação do Instituto
          Filhas da Terra.
        </p>
      </div>

      {/* Event Details */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-8'>
          {/* Event Info Card */}
          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader>
              <CardTitle className='text-[#92400e] dark:text-orange-400 flex items-center gap-2'>
                <Calendar className='w-5 h-5' />
                Informações do Evento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-center gap-3 text-gray-700 dark:text-gray-300'>
                  <Calendar className='w-5 h-5 text-[#92400e] dark:text-orange-400' />
                  <span className='font-semibold'>6 de novembro, 2025</span>
                </div>
                <div className='flex items-center gap-3 text-gray-700 dark:text-gray-300'>
                  <Clock className='w-5 h-5 text-[#92400e] dark:text-orange-400' />
                  <span className='font-semibold'>14:30 às 17:15</span>
                </div>
                <div className='flex items-start gap-3 text-gray-700 dark:text-gray-300'>
                  <MapPin className='w-5 h-5 text-[#92400e] dark:text-orange-400 mt-1' />
                  <div>
                    <span className='font-semibold'>
                      Auditório da Administração Regional de Ceilândia
                    </span>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Ceilândia, Distrito Federal
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3 text-gray-700 dark:text-gray-300'>
                  <Users className='w-5 h-5 text-[#92400e] dark:text-orange-400 mt-1' />
                  <div>
                    <span className='font-semibold'>Organização: Adasa</span>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Agência Reguladora de Águas, Energia e Saneamento Básico
                      do Distrito Federal
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Program Card */}
          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader>
              <CardTitle className='text-[#92400e] dark:text-orange-400 flex items-center gap-2'>
                <Sprout className='w-5 h-5' />
                Programação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-[#92400e] dark:bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    1
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800 dark:text-gray-200'>
                      14:30 - Abertura Oficial
                    </h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Diretoria da Adasa e representante da Administração
                      Regional de Ceilândia
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-[#92400e] dark:bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    2
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800 dark:text-gray-200'>
                      14:50 - A história e os aprendizados da Floresta da Nasaré
                    </h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Com Nasaré Francisco da Silva (Floresta da Nasaré) e
                      Wanderley Souza (Instituto Filhas da Terra)
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-[#92400e] dark:bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    3
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800 dark:text-gray-200'>
                      15:20 - O papel da Adasa na promoção da sustentabilidade e
                      na regulação dos serviços de resíduos sólidos
                    </h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Com Élen Dânia Santos (Superintendente de Resíduos Sólidos
                      da Adasa)
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-[#92400e] dark:bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    4
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800 dark:text-gray-200'>
                      15:40 - Boas práticas agroecológicas e fortalecimento das
                      hortas comunitárias
                    </h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Com Isabella Carlota Sousa Belo e Rogério Lúcio Vianna
                      (EMATER)
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-[#92400e] dark:bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    5
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800 dark:text-gray-200'>
                      16:20 - Intervalo
                    </h4>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-[#92400e] dark:bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    6
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800 dark:text-gray-200'>
                      16:35 - Compostagem descentralizada: um caminho para
                      transformar resíduos em adubo
                    </h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Com Allysson Sullyvan (SLU)
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-[#92400e] dark:bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    7
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800 dark:text-gray-200'>
                      17:15 - Encerramento
                    </h4>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Card */}
          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader>
              <CardTitle className='text-[#92400e] dark:text-orange-400 flex items-center gap-2'>
                <Leaf className='w-5 h-5' />
                Sobre o Evento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-gray-700 dark:text-gray-300 mb-4'>
                Esta oficina tem como objetivo promover a sustentabilidade
                através da compostagem descentralizada e o fortalecimento das
                hortas comunitárias. O evento conta com a participação de
                diversos especialistas e representantes de organizações
                comprometidas com práticas agroecológicas e gestão adequada de
                resíduos sólidos.
              </p>
              <p className='text-gray-700 dark:text-gray-300 mb-4'>
                O Instituto Filhas da Terra participa apresentando a história e
                os aprendizados da Floresta da Nasaré, compartilhando
                experiências práticas de cuidado ambiental e fortalecimento
                comunitário.
              </p>
              <p className='text-gray-700 dark:text-gray-300'>
                A participação é gratuita e aberta ao público interessado em
                compostagem, hortas comunitárias e práticas sustentáveis.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Calendar Component */}
          <EventCalendar
            events={events}
            initialDate={new Date(2025, 10, 6)}
            title='Calendário do Evento'
            highlightEventId={4}
          />

          {/* Organizers Card */}
          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader>
              <CardTitle className='text-[#92400e] dark:text-orange-400 flex items-center gap-2'>
                <Users className='w-5 h-5' />
                Organização
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
                <strong>Adasa</strong>
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                Agência Reguladora de Águas, Energia e Saneamento Básico do
                Distrito Federal
              </p>
            </CardContent>
          </Card>

          {/* Partners Card */}
          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader>
              <CardTitle className='text-[#92400e] dark:text-orange-400 flex items-center gap-2'>
                <Users className='w-5 h-5' />
                Participação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className='space-y-2 text-sm text-gray-600 dark:text-gray-300'>
                <li>• Instituto Filhas da Terra</li>
                <li>• Floresta da Nasaré</li>
                <li>• EMATER</li>
                <li>• SLU</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
