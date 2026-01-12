'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { PortableTextBlock } from 'next-sanity'
import { cn } from '@/lib/utils'
import ContentBlock from './ContentBlock'
import CustomPortableText from '../portableText/PortableText'

import 'swiper/css'
import 'swiper/css/pagination'

interface SuccessStoriesBlockProps {
	block: {
		_key: string
		_type: 'successStoriesBlock'
		backgroundColor?: string
		stories?: Array<{
			portableTextBlock?: PortableTextBlock[]
		}>
	}
	index: number
}

/**
 * Calculate the total character count of a portable text block
 */
function getCharacterCount(portableTextBlock?: PortableTextBlock[]): number {
	if (!portableTextBlock) return 0
	return portableTextBlock.reduce((count, block) => {
		if (block._type === 'block' && block.children) {
			return count + block.children.reduce((childCount, child) => {
				return childCount + (typeof child.text === 'string' ? child.text.length : 0)
			}, 0)
		}
		return count
	}, 0)
}

/**
 * Success Stories Block Component
 * Displays up to 4 success stories in a carousel with yellow background and navy title
 * Uses skinny styling (reduced padding) and centers content
 * Stories are sorted by length (longest first) and container height is set based on the longest story
 */
export default function SuccessStoriesBlock({ block }: SuccessStoriesBlockProps) {
	const { stories, backgroundColor = 'yellow' } = block
	const measureRef = useRef<HTMLDivElement>(null)
	const [containerHeight, setContainerHeight] = useState<number | null>(null)
	const [isMeasuring, setIsMeasuring] = useState(true)

	// Sort stories by character count (longest first)
	const sortedStories = useMemo(() => {
		if (!stories || stories.length === 0) {
			return []
		}
		return [...stories].sort((a, b) => {
			const aCount = getCharacterCount(a.portableTextBlock)
			const bCount = getCharacterCount(b.portableTextBlock)
			return bCount - aCount
		})
	}, [stories])

	// Measure the longest story's height before showing the carousel
	useEffect(() => {
		if (!measureRef.current || sortedStories.length === 0) {
			return
		}

		const measureHeight = () => {
			const height = measureRef.current?.scrollHeight
			if (height && height > 0) {
				// Add extra space for pagination dots (typically ~30-40px)
				const paginationSpace = 20
				setContainerHeight(height + paginationSpace)
				setIsMeasuring(false)
			}
		}

		// Measure immediately
		measureHeight()

		// Also measure after a short delay to account for any async rendering
		const timeout = setTimeout(measureHeight, 50)

		// Measure on window resize (but don't hide content)
		const handleResize = () => {
			if (!isMeasuring) {
				measureHeight()
			}
		}
		window.addEventListener('resize', handleResize)

		return () => {
			clearTimeout(timeout)
			window.removeEventListener('resize', handleResize)
		}
	}, [sortedStories, isMeasuring])

	if (!stories || stories.length === 0) {
		return null
	}

	return (
		<ContentBlock
			bgColor={`var(--success-stories-bg-${backgroundColor})`}
			bgImage={null}
			overlay="noOverlay"
			removeBottomPadding={false}
			skinny={true}
		>
			<div
				data-component="SuccessStoriesBlock"
				data-bg-color={backgroundColor}
				className="w-full"
			>
				<h3 className="font-bold text-center">
					Success Stories
				</h3>
				<div className="max-w-4xl mx-auto relative">
					{/* Hidden measurement container - renders first story to measure height */}
					{sortedStories.length > 0 && sortedStories[0]?.portableTextBlock && (
						<div
							ref={measureRef}
							className="absolute top-0 left-0 w-full opacity-0 pointer-events-none invisible"
							style={{
								maxWidth: '1024px',
							}}
						>
							<div className="px-4 md:px-8">
								<CustomPortableText
									value={sortedStories[0].portableTextBlock}
									centered={true}
									className="text-center w-full mb-2"
								/>
							</div>
						</div>
					)}
					<div
						style={{
							height: containerHeight ? `${containerHeight}px` : undefined,
							minHeight: containerHeight ? `${containerHeight}px` : undefined,
							opacity: isMeasuring ? 0 : 1,
							transition: 'opacity 0.15s ease-in',
						}}
					>
						<Swiper
							spaceBetween={30}
							autoplay={{
								delay: 5000,
								disableOnInteraction: false,
							}}
							loop={sortedStories.length > 1}
							pagination={{ clickable: true }}
							modules={[Autoplay, Pagination]}
							className="successStoriesSwiper h-full"
						>
							{sortedStories.map((story, index) => (
								<SwiperSlide key={index}>
									<div
										className={cn(
											'flex items-center justify-center',
											'px-4 md:px-8'
										)}
									>
										{story.portableTextBlock && (
											<CustomPortableText
												value={story.portableTextBlock}
												centered={true}
												className="text-center w-full mb-2"
											/>
										)}
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>
			</div>
		</ContentBlock>
	)
}
