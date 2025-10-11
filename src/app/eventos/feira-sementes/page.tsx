import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  ArrowLeft,
  Users,
  Leaf,
  Music,
} from 'lucide-react'
import Link from 'next/link'
import EventCalendar from '@/components/ui/event-calendar'

export default function FeiraSementesPage() {
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
          🌾 Feira de Sementes e Mudas – Floresta da Nasaré 🌿
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
          No Dia de Todos os Santos, 1 de novembro, a Floresta da Nasaré se
          transforma em um grande ponto de encontro entre saberes, sementes e
          muita arte cultura 🌱
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
                  <span className='font-semibold'>1 de novembro, 2025</span>
                </div>
                <div className='flex items-center gap-3 text-gray-700 dark:text-gray-300'>
                  <Clock className='w-5 h-5 text-[#92400e] dark:text-orange-400' />
                  <span className='font-semibold'>9h às 17h</span>
                </div>
                <div className='flex items-start gap-3 text-gray-700 dark:text-gray-300'>
                  <MapPin className='w-5 h-5 text-[#92400e] dark:text-orange-400 mt-1' />
                  <div>
                    <span className='font-semibold'>Floresta da Nasaré</span>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      QNR 5, Ceilândia, próxima à BR-070
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
                <Music className='w-5 h-5' />
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
                      Feira de sementes, mudas e artesanato
                    </h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Troca e venda de produtos locais e sustentáveis
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-[#92400e] dark:bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    2
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800 dark:text-gray-200'>
                      Rodas de conversa sobre agroecologia e soberania alimentar
                    </h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Discussões sobre práticas sustentáveis e autonomia
                      alimentar
                    </p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <div className='w-8 h-8 bg-[#92400e] dark:bg-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold'>
                    3
                  </div>
                  <div>
                    <h4 className='font-semibold text-gray-800 dark:text-gray-200'>
                      Apresentações culturais
                    </h4>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>
                      Com Baque Dando Onda e outras atrações
                    </p>
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
                É uma oportunidade de fortalecer a agricultura urbana, celebrar
                a biodiversidade, a soberania alimentar e o poder da
                coletividade dentro da nossa quebrada.
              </p>
              <p className='text-gray-700 dark:text-gray-300 mb-4'>
                A participação é livre e aberta a todos os públicos.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Calendar Component */}
          <EventCalendar
            events={events}
            initialDate={new Date(2025, 10, 1)}
            title='Calendário do Evento'
            highlightEventId={3}
          />

          {/* Registration Card */}
          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader>
              <CardTitle className='text-[#92400e] dark:text-orange-400 flex items-center gap-2'>
                <Users className='w-5 h-5' />
                Quer Expor?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-600 dark:text-gray-300 mb-4'>
                Se você quer expor na feira, inscreva-se pelo formulário
                oficial.
              </p>
              <a
                href='https://docs.google.com/forms/d/e/1FAIpQLSdaf4lqUitqNsok8ABlvs9tZxBpUI1tTCQUq2NPFqdxlhyCIQ/viewform?usp=header'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#92400e] text-white rounded-lg hover:bg-[#78350f] transition-colors text-sm'
              >
                <ExternalLink className='w-4 h-4' />
                Inscrever-se
              </a>
            </CardContent>
          </Card>

          {/* Instagram Card */}
          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader>
              <CardTitle className='text-[#92400e] dark:text-orange-400 flex items-center gap-2'>
                <ExternalLink className='w-5 h-5' />
                Mais Informações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className='text-sm text-gray-600 dark:text-gray-300 mb-4'>
                Acompanhe mais detalhes e atualizações no Instagram.
              </p>
              <a
                href='https://www.instagram.com/p/DPjXBBegL7Z/?igsh=MTJ0MzU4N25mYnNo'
                target='_blank'
                rel='noopener noreferrer'
                className='w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-[#92400e] dark:border-orange-400 text-[#92400e] dark:text-orange-400 rounded-lg hover:bg-[#92400e] hover:text-white dark:hover:bg-orange-400 dark:hover:text-black transition-colors text-sm'
              >
                <ExternalLink className='w-4 h-4' />
                Ver no Instagram
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
