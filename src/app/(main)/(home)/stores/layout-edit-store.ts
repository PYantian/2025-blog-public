'use client'

import { create } from 'zustand'
import { useConfigStore, type CardStyles } from './config-store'
import type { HomeLayoutMode } from '../utils/home-layout-mode'
import type { LayoutBucket } from '../utils/resolve-home-card-frame'

type CardKey = keyof CardStyles

type EditableMode = Exclude<HomeLayoutMode, 'portrait'>

const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value))

function modeToBucket(mode: EditableMode): LayoutBucket {
  if (mode === 'mobileLandscape') return 'mobileLandscape'
  if (mode === 'tabletLandscape') return 'tabletLandscape'
  return 'desktop'
}

interface LayoutEditState {
  editing: boolean
  snapshot: CardStyles | null
  mode: EditableMode
  setMode: (mode: EditableMode) => void
  startEditing: (mode: EditableMode) => void
  cancelEditing: () => void
  saveEditing: () => void
  setOffset: (key: CardKey, offsetX: number | null, offsetY: number | null) => void
  setSize: (key: CardKey, width: number | undefined, height: number | undefined) => void
}

export const useLayoutEditStore = create<LayoutEditState>((set, get) => ({
  editing: false,
  snapshot: null,
  mode: 'desktop',

  setMode: mode => set({ mode }),

  startEditing: mode => {
    const { cardStyles } = useConfigStore.getState()
    set({
      editing: true,
      mode,
      snapshot: clone(cardStyles)
    })
  },

  cancelEditing: () => {
    const { snapshot } = get()

    if (!snapshot) {
      set({ editing: false, snapshot: null })
      return
    }

    useConfigStore.getState().setCardStyles(snapshot)
    set({ editing: false, snapshot: null })
  },

  saveEditing: () => {
    set({ editing: false, snapshot: null })
  },

  setOffset: (key, offsetX, offsetY) => {
    const { cardStyles, setCardStyles } = useConfigStore.getState()
    const { mode } = get()
    const bucket = modeToBucket(mode)

    const current = cardStyles[key] as any

    const next: CardStyles = {
      ...cardStyles,
      [key]: {
        ...current,
        [bucket]: {
          ...current[bucket],
          offsetX,
          offsetY
        }
      }
    }

    setCardStyles(next)
  },

  setSize: (key, width, height) => {
    const { cardStyles, setCardStyles } = useConfigStore.getState()
    const { mode } = get()
    const bucket = modeToBucket(mode)

    const current = cardStyles[key] as any

    const next: CardStyles = {
      ...cardStyles,
      [key]: {
        ...current,
        [bucket]: {
          ...current[bucket],
          width: width ?? current[bucket].width,
          height: height ?? current[bucket].height
        }
      }
    }

    setCardStyles(next)
  }
}))
