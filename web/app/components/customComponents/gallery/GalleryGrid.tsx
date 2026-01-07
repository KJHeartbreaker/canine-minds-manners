'use client'

import { useState, useEffect } from 'react'
import { Swiper as SwiperType } from 'swiper'
import { cn } from '@/lib/utils'
import Modal from '../../Modal'
import SanityImage from '../../SanityImage'
import { GalleryCarousel } from './GalleryCarousel'
import { SanityImage as SanityImageType } from '../../types'

interface GalleryGridProps {
    images: SanityImageType[]
}

/**
 * Gallery Grid Component
 * Displays images in a masonry-style grid with modal carousel
 */
export default function GalleryGrid({ images }: GalleryGridProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

    const openModal = (index: number) => {
        setSelectedImageIndex(index)
        setIsModalOpen(true)

        if (thumbsSwiper) {
            thumbsSwiper.destroy(true, true)
            setThumbsSwiper(null)
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isModalOpen])

    const generateImagePositions = (index: number) => {
        const imagePositions = [
            { col: 1, rowStart: 1, height: 300, classes: 'top-short' },
            { col: 2, rowStart: 1, height: 500, classes: 'top-long' },
            { col: 3, rowStart: 1, height: 300, classes: 'top-short' },
            { col: 1, rowStart: 3, height: 500, classes: 'bottom-long' },
            { col: 2, rowStart: 4, height: 300, classes: 'bottom-short' },
            { col: 3, rowStart: 3, height: 500, classes: 'bottom-long' },
        ]

        const setIndex = Math.floor(index / 6)

        return {
            ...imagePositions[index % imagePositions.length],
            rowStart: imagePositions[index % imagePositions.length].rowStart + setIndex * 5,
        }
    }

    return (
        <div data-component="GalleryGrid" className="grid gap-2.5 grid-cols-1 grid-rows-auto p-2.5 sm:grid-cols-[repeat(3,250px)] sm:grid-rows-[repeat(5,100px)] sm:p-0 lg:grid-cols-[repeat(3,380px)] lg:grid-rows-[repeat(5,150px)]">
            {images.map((image, index) => {
                const { col, rowStart, height, classes } = generateImagePositions(index)
                return (
                    <div
                        key={image.asset?._id || index}
                        className={cn(
                            'flex cursor-pointer',
                            `sm:col-start-${col}`,
                            `sm:row-start-${rowStart}`,
                            classes === 'top-short' && 'sm:row-end-[span_2]',
                            classes === 'top-long' && 'sm:row-end-[span_3]',
                            classes === 'bottom-short' && 'sm:row-end-[span_2]',
                            classes === 'bottom-long' && 'sm:row-end-[span_3]',
                        )}
                        onClick={() => openModal(index)}
                    >
                        <SanityImage
                            image={image}
                            alt={image?.alt}
                            width={400}
                            height={height}
                            className="h-full object-cover"
                        />
                    </div>
                )
            })}
            {isModalOpen && (
                <Modal
                    closeModal={() => {
                        setIsModalOpen(false)
                        setSelectedImageIndex(0)
                    }}
                >
                    <GalleryCarousel
                        key={isModalOpen ? 'open' : 'closed'}
                        images={images}
                        selectedImageIndex={selectedImageIndex}
                        thumbsSwiper={thumbsSwiper}
                        setThumbsSwiper={setThumbsSwiper}
                    />
                </Modal>
            )}
        </div>
    )
}

