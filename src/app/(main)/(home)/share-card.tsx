'use client'

import { useEffect, useState } from 'react'
import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { useConfigStore } from './stores/config-store'
import shareList from '@/app/(main)/share/list.json'
import Link from 'next/link'
import { HomeDraggableLayer } from './home-draggable-layer'
import { useHomeLayoutMode } from './utils/home-layout-mode'
import { resolveHomeCardFrame } from './utils/resolve-home-card-frame'

type ShareItem = {
  name: string
  url: string
  logo: string
  description: string
  tags: string[]
  stars: number
}

export default function ShareCard() {
  const center = useCenterStore()
  const { cardStyles, siteContent } = useConfigStore()
  const [randomItem, setRandomItem] = useState<ShareItem | null>(null)
  const mode = useHomeLayoutMode()

  const styles = resolveHomeCardFrame(cardStyles, 'shareCard', mode)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * shareList.length)
    setRandomItem(shareList[randomIndex] as ShareItem)
  }, [])

  if (!randomItem) {
    return null
  }

  const x = center.x + (styles.offsetX ?? 0)
  const y = center.y + (styles.offsetY ?? 0)

  return (
    <HomeDraggableLayer
      cardKey='shareCard'
      defaultX={x}
      defaultY={y}
      width={styles.width}
      height={styles.height}
    >
      <Card x={x} y={y} width={styles.width} height={styles.height} order={styles.order}>
        {siteContent.enableChristmas && (
          <img
            src='/images/christmas-2.webp'
            alt='Christmas decoration'
            className='pointer-events-none absolute -top-5 -right-3 z-10 size-14 rotate-12 select-none'
          />
        )}

        <Link
          href={randomItem.url}
          target='_blank'
          className='flex h-full flex-col justify-between p-5'
        >
          <div>
            <h2 className='text-lg font-semibold'>随机推荐</h2>
            <h3 className='mt-3 text-base font-medium'>{randomItem.name}</h3>
            <p className='mt-2 line-clamp-3 text-sm text-muted-foreground'>
              {randomItem.description}
            </p>
          </div>

          <div className='mt-4 flex flex-wrap gap-2'>
            {randomItem.tags?.slice(0, 3).map(tag => (
              <span key={tag} className='rounded-full bg-secondary/60 px-2 py-1 text-xs'>
                {tag}
              </span>
            ))}
          </div>
        </Link>
      </Card>
    </HomeDraggableLayer>
  )
}
