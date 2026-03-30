import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { useLatestBlog } from '@/hooks/use-blog-index'
import { useConfigStore } from './stores/config-store'
import dayjs from 'dayjs'
import Link from 'next/link'
import { HomeDraggableLayer } from './home-draggable-layer'
import { useHomeLayoutMode } from './utils/home-layout-mode'
import { resolveHomeCardFrame } from './utils/resolve-home-card-frame'

export default function ArticleCard() {
  const center = useCenterStore()
  const { cardStyles, siteContent } = useConfigStore()
  const { blog, loading } = useLatestBlog()
  const mode = useHomeLayoutMode()

  const styles = resolveHomeCardFrame(cardStyles, 'articleCard', mode)

  const x = center.x + (styles.offsetX ?? 0)
  const y = center.y + (styles.offsetY ?? 0)

  return (
    <HomeDraggableLayer
      cardKey='articleCard'
      defaultX={x}
      defaultY={y}
      width={styles.width}
      height={styles.height}
    >
      <Card x={x} y={y} width={styles.width} height={styles.height} order={styles.order}>
        {siteContent.enableChristmas && (
          <img
            src='/images/christmas-4.webp'
            alt='Christmas decoration'
            className='pointer-events-none absolute -top-2 -left-2 z-10 size-12 select-none'
          />
        )}

        <div className='flex h-full flex-col p-5'>
          <h2 className='text-lg font-semibold'>最新文章</h2>

          <div className='mt-3 flex-1'>
            {loading ? (
              <div className='text-sm text-muted-foreground'>加载中...</div>
            ) : blog ? (
              <Link href={`/blog/${blog.slug}`} className='block h-full'>
                {blog.cover ? (
                  <img
                    src={blog.cover}
                    alt={blog.title || blog.slug}
                    className='mb-3 h-18 w-full rounded-2xl object-cover'
                  />
                ) : (
                  <div className='mb-3 flex h-18 w-full items-center justify-center rounded-2xl bg-secondary/50 text-3xl'>
                    +
                  </div>
                )}

                <h3 className='line-clamp-2 text-sm font-medium'>
                  {blog.title || blog.slug}
                </h3>

                {blog.summary && (
                  <p className='mt-2 line-clamp-2 text-xs text-muted-foreground'>
                    {blog.summary}
                  </p>
                )}

                <div className='mt-2 text-xs text-muted-foreground'>
                  {dayjs(blog.date).format('YYYY/M/D')}
                </div>
              </Link>
            ) : (
              <div className='text-sm text-muted-foreground'>暂无文章</div>
            )}
          </div>
        </div>
      </Card>
    </HomeDraggableLayer>
  )
}
