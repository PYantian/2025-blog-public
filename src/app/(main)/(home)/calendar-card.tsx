import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { useConfigStore } from './stores/config-store'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { cn } from '@/lib/utils'
import { HomeDraggableLayer } from './home-draggable-layer'
import { useHomeLayoutMode } from './utils/home-layout-mode'
import { resolveHomeCardFrame } from './utils/resolve-home-card-frame'

dayjs.locale('zh-cn')

const dates = ['一', '二', '三', '四', '五', '六', '日']

export default function CalendarCard() {
  const center = useCenterStore()
  const { cardStyles, siteContent } = useConfigStore()
  const mode = useHomeLayoutMode()

  const now = dayjs()
  const currentDate = now.date()
  const firstDayOfMonth = now.startOf('month')
  const firstDayWeekday = (firstDayOfMonth.day() + 6) % 7
  const daysInMonth = now.daysInMonth()
  const currentWeekday = (now.day() + 6) % 7

  const styles = resolveHomeCardFrame(cardStyles, 'calendarCard', mode)

  const x = center.x + (styles.offsetX ?? 0)
  const y = center.y + (styles.offsetY ?? 0)

  return (
    <HomeDraggableLayer
      cardKey='calendarCard'
      defaultX={x}
      defaultY={y}
      width={styles.width}
      height={styles.height}
    >
      <Card x={x} y={y} width={styles.width} height={styles.height} order={styles.order}>
        {siteContent.enableChristmas && (
          <img
            src='/images/christmas-1.webp'
            alt='Christmas decoration'
            className='pointer-events-none absolute -top-8 -right-4 z-10 size-16 rotate-12 select-none'
          />
        )}

        <div className='flex h-full flex-col p-5'>
          <h3 className='text-lg font-semibold'>{now.format('YYYY/M/D')} {now.format('ddd')}</h3>

          <div className='mt-4 grid grid-cols-7 gap-2 text-center text-sm'>
            {dates.map((date, index) => {
              const isCurrentWeekday = index === currentWeekday

              return (
                <div
                  key={date}
                  className={cn(
                    'text-muted-foreground',
                    isCurrentWeekday && 'text-foreground font-medium'
                  )}
                >
                  {date}
                </div>
              )
            })}

            {new Array(firstDayWeekday).fill(0).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}

            {new Array(daysInMonth).fill(0).map((_, index) => {
              const day = index + 1
              const isToday = day === currentDate

              return (
                <div
                  key={day}
                  className={cn(
                    'flex h-8 items-center justify-center rounded-xl text-sm',
                    isToday && 'bg-primary text-primary-foreground font-semibold'
                  )}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </HomeDraggableLayer>
  )
}
