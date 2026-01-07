/* eslint-disable no-unused-vars */
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import SanityImage from '../../SanityImage'
import { SanityImage as SanityImageType } from '../../types'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

interface GalleryCarouselProps {
    images: SanityImageType[]
    selectedImageIndex: number
    thumbsSwiper: SwiperType | null
    setThumbsSwiper: (swiper: SwiperType) => void
}

/**
 * Gallery Carousel Component
 * Main carousel with thumbnail navigation for gallery modal
 */
export function GalleryCarousel({
    images,
    selectedImageIndex,
    thumbsSwiper,
    setThumbsSwiper,
}: GalleryCarouselProps) {
    return (
        <div data-component="GalleryCarousel" className="flex flex-col w-full">
            <div className="w-full h-[350px] md:h-[500px]">
                <Swiper
                    initialSlide={selectedImageIndex}
                    loop
                    spaceBetween={10}
                    navigation
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="main-gallery-swiper"
                >
                    {images.map((im, i) => (
                        <SwiperSlide key={i}>
                            <SanityImage
                                image={im}
                                alt={im?.alt}
                                width={800}
                                height={500}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="box-border py-2.5 w-full h-[100px] md:h-[150px]">
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode
                    watchSlidesProgress
                    className="navSwipe w-full h-full"
                    modules={[FreeMode, Navigation, Thumbs]}
                >
                    {images.map((im, i) => (
                        <SwiperSlide key={i} className="w-1/4 h-full opacity-40 [&.swiper-slide-thumb-active]:opacity-100">
                            <SanityImage
                                image={im}
                                alt={im?.alt}
                                width={400}
                                height={300}
                                className="block w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}

