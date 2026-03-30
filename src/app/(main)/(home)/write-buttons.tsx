import { ANIMATION_DELAY } from '@/consts'
import PenSVG from '@/svgs/pen.svg'
import DotsSVG from '@/svgs/dots.svg'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useConfigStore } from './stores/config-store'
import { useCenterStore } from '@/hooks/use-center'
import { useRouter } from 'next/navigation'
import { useHomeLayoutMode } from './utils/home-layout-mode'
import { resolveHomeCardFrame } from './utils/resolve-home-card-frame'
import { HomeDraggableLayer } from './home-draggable-layer'

export default function WriteButton() {
  const center = useCenterStore()
  const { cardStyles, setConfigDialogOpen, siteContent } = useConfigStore()
  const router = useRouter()
  const mode = useHomeLayoutMode()
  const styles = resolveHomeCardFrame(cardStyles, 'writeButtons', mode)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), styles.order * ANIMATION_DELAY * 1000)
    return () => clearTimeout(timer)
  }, [styles.order])

  if (mode === 'portrait') return null
  if (!show) return null

  const x = center.x + (styles.offsetX ?? 0)
  const y = center.y + (styles.offsetY ?? 0)

  return (
    <HomeDraggableLayer
      cardKey='writeButtons'
      defaultX={x}
      defaultY={y}
      width={styles.width}
      height={styles.height}
    >
      <motion.div
        className='absolute z-[8] flex items-center gap-2'
        style={{ left: x, top: y, width: styles.width, height: styles.height }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={() => router.push('/write')}
          style={{ boxShadow: 'inset 0 0 12px rgba(255, 255, 255, 0.4)' }}
          className='brand-btn flex h-full flex-1 items-center justify-center gap-2 whitespace-nowrap'
        >
          {siteContent.enableChristmas && (
            <img
              src='/images/christmas-4.webp'
              alt='Christmas decoration'
              className='pointer-events-none absolute -top-2 -right-2 z-10 size-8 select-none'
            />
          )}

          <PenSVG className='size-4' />
          写文章
        </button>

        <button
          onClick={() => setConfigDialogOpen(true)}
          className='card btn flex h-full w-11 items-center justify-center rounded-2xl p-2'
        >
          <DotsSVG className='size-4' />
        </button>
      </motion.div>
    </HomeDraggableLayer>
  )
}
