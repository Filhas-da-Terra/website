import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  ArrowLeft,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import EventCalendar from '@/components/ui/event-calendar'

export default function DiaDasCriancasPage() {
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
          🎈 Dia das Crianças - Floresta da Nasaré 🌳
        </h1>
        <p className='text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
          Uma celebração especial do Dia das Crianças na Floresta da Nasaré,
          conectando os pequenos com a natureza e a preservação ambiental.
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
                  <span className='font-semibold'>19 de outubro, 2025</span>
                </div>
                <div className='flex items-center gap-3 text-gray-700 dark:text-gray-300'>
                  <Clock className='w-5 h-5 text-[#92400e] dark:text-orange-400' />
                  <span className='font-semibold'>14:00</span>
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

          {/* Volunteer Activities Card */}
          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader>
              <CardTitle className='text-[#92400e] dark:text-orange-400 flex items-center gap-2'>
                <Users className='w-5 h-5' />
                Atividades Voluntárias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div>
                  <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                    Toda contribuição é muito bem-vinda:
                  </h4>
                  <ul className='space-y-2 text-sm text-gray-600 dark:text-gray-300'>
                    <li className='flex items-center gap-2'>
                      <span className='text-[#92400e] dark:text-orange-400'>
                        🧸
                      </span>
                      Doação de brinquedos
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-[#92400e] dark:text-orange-400'>
                        🍎
                      </span>
                      Alimentos, doces e sucos
                    </li>
                    <li className='flex items-center gap-2'>
                      <span className='text-[#92400e] dark:text-orange-400'>
                        🤝
                      </span>
                      Atividades voluntárias: brincadeiras, pintura de rosto,
                      música, contação de histórias, distribuição de sorvete e
                      recreação
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Card */}
          <Card className='hover:shadow-lg transition-shadow duration-300'>
            <CardHeader>
              <CardTitle className='text-[#92400e] dark:text-orange-400 flex items-center gap-2'>
                <Users className='w-5 h-5' />
                Como Apoiar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='space-y-2 text-sm text-gray-600 dark:text-gray-300'>
                  <div className='flex items-center gap-2'>
                    <span className='text-[#92400e] dark:text-orange-400'>
                      💰
                    </span>
                    <span className='font-mono'>
                      PIX: institutofilhasdaterra@gmail.com
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='text-[#92400e] dark:text-orange-400'>
                      📞
                    </span>
                    <span>Telefone para Contato: Larissa (61) 995198452</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          {/* Calendar Component */}
          <EventCalendar
            events={events}
            initialDate={new Date(2025, 9, 1)}
            title='Calendário do Evento'
            highlightEventId={2}
          />

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
                href='https://www.instagram.com/p/DPUGF_jkQ4m/?igsh=bzNjZ3czdHZnaHZo'
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
