import LikeButton from '@/components/like-button'
import { ANIMATION_DELAY } from '@/consts'
import { motion } from 'motion/react'
import { useCenterStore } from '@/hooks/use-center'
import { useConfigStore } from './stores/config-store'
import { HomeDraggableLayer } from './home-draggable-layer'
import { useHomeLayoutMode } from './utils/home-layout-mode'
import { resolveHomeCardFrame } from './utils/resolve-home-card-frame'

export default function LikePosition() {
  const center = useCenterStore()
  const { cardStyles, siteContent } = useConfigStore()
  const mode = useHomeLayoutMode()
  const styles = resolveHomeCardFrame(cardStyles, 'likePosition', mode)

  const x = center.x + (styles.offsetX ?? 0)
  const y = center.y + (styles.offsetY ?? 0)

  return (
    <HomeDraggableLayer
      cardKey='likePosition'
      defaultX={x}
      defaultY={y}
      width={styles.width}
      height={styles.height}
    >
      <motion.div
        className='absolute z-[8]'
        style={{ left: x, top: y, width: styles.width, height: styles.height }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: styles.order * ANIMATION_DELAY }}
      >
        {siteContent.enableChristmas && (
          <img
            src='/images/christmas-1.webp'
            alt='Christmas decoration'
            className='pointer-events-none absolute -top-2 -right-2 z-10 size-8 rotate-12 select-none'
          />
        )}

        <LikeButton />
      </motion.div>
    </HomeDraggableLayer>
  )
}
