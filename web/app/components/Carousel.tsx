'use client'

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type SwiperCore from 'swiper'
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules'
import { cn } from '@/lib/utils'
import SanityImage from './SanityImage'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/pagination'

interface CarouselProps {
    carouselImages: Array<{
        alt?: string
        asset?: {
            _id: string
        }
        hotspot?: any
        crop?: any
    }>
    showThumbs?: boolean
    showPagination?: boolean
}

/**
 * Carousel Component using Swiper
 * Displays images in a carousel with optional thumbnail navigation and pagination
 */
export default function Carousel({
    carouselImages,
    showThumbs = true,
    showPagination = true,
}: CarouselProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)
    const [mainSwiper, setMainSwiper] = useState<SwiperCore | null>(null)

    // Update thumbs connection when thumbs swiper is ready
    useEffect(() => {
        if (mainSwiper && thumbsSwiper && !thumbsSwiper.destroyed && mainSwiper.thumbs) {
            // Swiper.js requires mutating the instance to configure thumbs
            // eslint-disable-next-line react-hooks/immutability
            mainSwiper.thumbs.swiper = thumbsSwiper
            if (typeof mainSwiper.thumbs.init === 'function') {
                mainSwiper.thumbs.init()
            }
            mainSwiper.update()
        }
    }, [mainSwiper, thumbsSwiper])

    if (!carouselImages || carouselImages.length === 0) {
        return null
    }

    return (
        <div data-component="Carousel" className="w-full rounded-lg overflow-hidden">
            {/* Main Swiper */}
            <Swiper
                onSwiper={setMainSwiper}
                loop
                spaceBetween={10}
                navigation
                thumbs={showThumbs ? (thumbsSwiper && !thumbsSwiper.destroyed ? { swiper: thumbsSwiper } : { swiper: null }) : undefined}
                pagination={showPagination ? { clickable: true } : false}
                modules={[FreeMode, Navigation, Thumbs, Pagination]}
                className="mainSwiper h-[350px] md:h-[500px]"
            >
                {carouselImages.map((image, i) => (
                    <SwiperSlide key={i}>
                        <SanityImage
                            image={image}
                            fill
                            className="w-full h-full object-cover"
                            sizes="100vw"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnail Swiper */}
            {showThumbs && (
                <div className={cn('box-border py-2.5 w-full h-[100px] md:h-[150px] transition-opacity duration-300', !thumbsSwiper && 'opacity-0 pointer-events-none')}>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode
                        watchSlidesProgress
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="navSwipe w-full h-full"
                    >
                        {carouselImages.map((image, i) => (
                            <SwiperSlide key={i} className="w-1/4 h-full">
                                <SanityImage
                                    image={image}
                                    width={400}
                                    height={300}
                                    className="block w-full h-full object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
    )
}

