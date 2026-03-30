import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { useConfigStore } from './stores/config-store'
import { useRouter } from 'next/navigation'
import { HomeDraggableLayer } from './home-draggable-layer'
import { useHomeLayoutMode } from './utils/home-layout-mode'
import { resolveHomeCardFrame } from './utils/resolve-home-card-frame'

export default function ArtCard() {
  const center = useCenterStore()
  const { cardStyles, siteContent } = useConfigStore()
  const router = useRouter()
  const mode = useHomeLayoutMode()

  const styles = resolveHomeCardFrame(cardStyles, 'artCard', mode)

  const x = center.x + (styles.offsetX ?? -(styles.width / 2))
  const y = center.y + (styles.offsetY ?? -(styles.height / 2))

  const artImages = siteContent.artImages ?? []
  const currentId = siteContent.currentArtImageId
  const currentArt =
    (currentId ? artImages.find(item => item.id === currentId) : undefined) ?? artImages[0]
  const artUrl = currentArt?.url || '/images/art/cat.png'

  return (
    <HomeDraggableLayer
      cardKey='artCard'
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
            className='pointer-events-none absolute -top-10 -left-6 z-10 size-24 -rotate-12 select-none'
          />
        )}

        <img
          onClick={() => router.push('/pictures')}
          src={artUrl}
          alt='wall art'
          className='h-full w-full rounded-[32px] object-cover'
        />
      </Card>
    </HomeDraggableLayer>
  )
}
