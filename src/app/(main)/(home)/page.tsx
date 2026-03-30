'use client'

import HiCard from '@/app/(main)/(home)/hi-card'
import ArtCard from '@/app/(main)/(home)/art-card'
import ClockCard from '@/app/(main)/(home)/clock-card'
import CalendarCard from '@/app/(main)/(home)/calendar-card'
import SocialButtons from '@/app/(main)/(home)/social-buttons'
import ShareCard from '@/app/(main)/(home)/share-card'
import AritcleCard from '@/app/(main)/(home)/aritcle-card'
import WriteButtons from '@/app/(main)/(home)/write-buttons'
import LikePosition from './like-position'
import HatCard from './hat-card'
import BeianCard from './beian-card'
import { useLayoutEditStore } from './stores/layout-edit-store'
import { useConfigStore } from './stores/config-store'
import { toast } from 'sonner'
import ConfigDialog from './config-dialog/index'
import { useEffect } from 'react'
import SnowfallBackground from '@/layout/backgrounds/snowfall'
import { useHomeLayoutMode } from './utils/home-layout-mode'

export default function Home() {
  const mode = useHomeLayoutMode()
  const isPortrait = mode === 'portrait'

  const { cardStyles, configDialogOpen, setConfigDialogOpen, siteContent } = useConfigStore()
  const editing = useLayoutEditStore(state => state.editing)
  const saveEditing = useLayoutEditStore(state => state.saveEditing)
  const cancelEditing = useLayoutEditStore(state => state.cancelEditing)
  const setEditMode = useLayoutEditStore(state => state.setMode)

  const handleSave = () => {
    saveEditing()
    toast.success('首页布局偏移已保存（尚未提交到远程配置）')
  }

  const handleCancel = () => {
    cancelEditing()
    toast.info('已取消此次拖拽布局修改')
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'l' || e.key === ',')) {
        e.preventDefault()
        setConfigDialogOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [setConfigDialogOpen])

  useEffect(() => {
    if (mode !== 'portrait') {
      setEditMode(mode)
    }
  }, [mode, setEditMode])

  return (
    <>
      {siteContent.enableChristmas && <SnowfallBackground />}

      {editing && (
        <div className='pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center pt-6'>
          <div className='pointer-events-auto flex items-center gap-3 rounded-2xl bg-white/80 px-4 py-2 shadow-lg backdrop-blur'>
            <span className='text-xs text-gray-600'>
              正在编辑首页布局：
              {mode === 'mobileLandscape'
                ? '手机横屏'
                : mode === 'tabletLandscape'
                  ? '平板横屏'
                  : '桌面'}
            </span>

            <button onClick={handleCancel} className='btn'>
              取消
            </button>
            <button onClick={handleSave} className='brand-btn'>
              保存偏移
            </button>
          </div>
        </div>
      )}

      <div
        className={[
          isPortrait
            ? 'flex flex-col items-center gap-6 pt-28 pb-20'
            : mode === 'mobileLandscape'
              ? 'relative min-h-[760px]'
              : mode === 'tabletLandscape'
                ? 'relative min-h-[920px]'
                : 'relative min-h-screen'
        ].join(' ')}
      >
        {cardStyles.artCard?.enabled !== false && <ArtCard />}
        {cardStyles.hiCard?.enabled !== false && <HiCard />}
        {!isPortrait && cardStyles.clockCard?.enabled !== false && <ClockCard />}
        {!isPortrait && cardStyles.calendarCard?.enabled !== false && <CalendarCard />}
        {cardStyles.socialButtons?.enabled !== false && <SocialButtons />}
        {!isPortrait && cardStyles.shareCard?.enabled !== false && <ShareCard />}
        {cardStyles.articleCard?.enabled !== false && <AritcleCard />}
        {!isPortrait && cardStyles.writeButtons?.enabled !== false && <WriteButtons />}
        {cardStyles.likePosition?.enabled !== false && <LikePosition />}
        {cardStyles.hatCard?.enabled !== false && <HatCard />}
        {cardStyles.beianCard?.enabled !== false && <BeianCard />}
      </div>

      <ConfigDialog open={configDialogOpen} onClose={() => setConfigDialogOpen(false)} />
    </>
  )
}
