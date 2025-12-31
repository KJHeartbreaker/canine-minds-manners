'use client'

import { useState } from 'react'
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
    showThumbs = false,
    showPagination = true,
}: CarouselProps) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)

    if (!carouselImages || carouselImages.length === 0) {
        return null
    }

    return (
        <div className="w-full rounded-lg overflow-hidden">
            {/* Main Swiper */}
            <Swiper
                loop
                spaceBetween={10}
                navigation
                thumbs={thumbsSwiper && !thumbsSwiper.destroyed ? { swiper: thumbsSwiper } : undefined}
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
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode
                    watchSlidesProgress
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="navSwiper h-[100px] md:h-[150px] py-2.5"
                >
                    {carouselImages.map((image, i) => (
                        <SwiperSlide key={i}>
                            <SanityImage
                                image={image}
                                width={400}
                                height={300}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {/* Custom Swiper Styles */}
            <style jsx global>{`
        .mainSwiper .swiper-button-prev,
        .mainSwiper .swiper-button-next {
          color: var(--color-orange);
        }

        .mainSwiper .swiper-button-prev:hover,
        .mainSwiper .swiper-button-next:hover {
          color: var(--color-blue-22);
        }

        .mainSwiper .swiper-pagination-bullet-active {
          background: var(--color-orange);
        }

        .mainSwiper .swiper-pagination-bullet {
          background: var(--color-white);
          opacity: 1;
        }
      `}</style>
        </div>
    )
}

