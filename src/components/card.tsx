'use client'

import { ANIMATION_DELAY } from '@/consts'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useSize } from '@/hooks/use-size'

interface Props {
	className?: string
	order: number
	width: number
	height?: number
	x: number
	y: number
	children: React.ReactNode
}

export default function Card({ children, order, width, height, x, y, className }: Props) {
	const { isPortrait, init } = useSize()
	const [show, setShow] = useState(false)

	const portraitMode = isPortrait && init
	const animationOrder = portraitMode ? 0 : order

	useEffect(() => {
		if (show) return
		if (x === 0 && y === 0) return

		const timer = setTimeout(() => {
			setShow(true)
		}, animationOrder * ANIMATION_DELAY * 1000)

		return () => clearTimeout(timer)
	}, [x, y, show, animationOrder])

	if (!show) return null

	return (
		<motion.div
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			className={cn(
				'card',
				portraitMode ? 'relative left-auto top-auto mx-auto' : 'card-abs',
				className
			)}
			style={
				portraitMode
					? {
							width: 'min(92vw, 420px)',
							height: 'auto'
						}
					: {
							width,
							height,
							left: x,
							top: y
						}
			}>
			{children}
		</motion.div>
	)
}
