'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

interface Event {
  id: number
  name: string
  date: Date
  color: string
}

interface EventCalendarProps {
  events: Event[]
  initialDate?: Date
  title?: string
  highlightEventId?: number
}

export default function EventCalendar({
  events,
  initialDate = new Date(2025, 9, 1),
  title = 'Calendário do Evento',
  highlightEventId,
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(initialDate)

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ]

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getEventsForDay = (day: number | null, month: number, year: number) => {
    if (day === null) return []
    return events.filter(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === month &&
        event.date.getFullYear() === year,
    )
  }

  const days = getDaysInMonth(currentDate)
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  return (
    <Card className='hover:shadow-lg transition-shadow duration-300'>
      <CardHeader>
        <CardTitle className='text-[#92400e] dark:text-orange-400 flex items-center gap-2'>
          <Calendar className='w-5 h-5' />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {/* Calendar Header */}
          <div className='flex items-center justify-between'>
            <button
              onClick={() => navigateMonth('prev')}
              className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
            >
              <ChevronLeft className='w-4 h-4' />
            </button>
            <h3 className='font-semibold text-lg'>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              onClick={() => navigateMonth('next')}
              className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
            >
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className='grid grid-cols-7 gap-1'>
            {/* Day Headers */}
            {dayNames.map((day) => (
              <div
                key={day}
                className='text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2'
              >
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {days.map((day, index) => {
              const dayEvents = getEventsForDay(day, currentMonth, currentYear)
              const hasHighlightedEvent =
                highlightEventId &&
                dayEvents.some((event) => event.id === highlightEventId)

              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex flex-col items-center justify-start text-sm rounded-lg transition-colors relative p-1
                    ${
                      day === null
                        ? 'invisible'
                        : hasHighlightedEvent
                          ? 'bg-[#92400e]/10 dark:bg-orange-400/10 border border-[#92400e]/20 dark:border-orange-400/20'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer'
                    }
                  `}
                >
                  <span
                    className={`${hasHighlightedEvent ? 'font-bold text-[#92400e] dark:text-orange-400' : ''}`}
                  >
                    {day}
                  </span>

                  {/* Event Badges */}
                  {dayEvents.length > 0 && (
                    <div className='flex flex-wrap gap-0.5 mt-1 justify-center'>
                      {dayEvents.slice(0, 2).map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className={`w-2 h-2 rounded-full ${event.color} ${event.color === 'bg-[#92400e]' ? 'dark:bg-orange-400' : ''}`}
                          title={event.name}
                        />
                      ))}
                      {dayEvents.length > 2 && (
                        <div
                          className='w-2 h-2 rounded-full bg-gray-400'
                          title={`+${dayEvents.length - 2} mais`}
                        />
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Event Legend */}
          <div className='space-y-2'>
            <h4 className='text-sm font-semibold text-gray-700 dark:text-gray-300'>
              Eventos do Mês
            </h4>
            <div className='space-y-1'>
              {events
                .filter(
                  (event) =>
                    event.date.getMonth() === currentMonth &&
                    event.date.getFullYear() === currentYear,
                )
                .map((event) => (
                  <div
                    key={event.id}
                    className='flex items-center gap-2 text-xs'
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${event.color} ${event.color === 'bg-[#92400e]' ? 'dark:bg-orange-400' : ''}`}
                    ></div>
                    <span className='text-gray-600 dark:text-gray-400'>
                      {event.date.getDate()} - {event.name}
                    </span>
                  </div>
                ))}
              {events.filter(
                (event) =>
                  event.date.getMonth() === currentMonth &&
                  event.date.getFullYear() === currentYear,
              ).length === 0 && (
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  Nenhum evento este mês
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
