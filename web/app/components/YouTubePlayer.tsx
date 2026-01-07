'use client'

import { useRef, useState, useEffect } from 'react'
import YouTube, { YouTubeEvent } from 'react-youtube'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface YouTubePlayerProps {
    videoId: string
    className?: string
}

/**
 * Lazy-loaded YouTube Player Component
 * Only loads the video when it comes into viewport
 * Shows a thumbnail placeholder to prevent layout shift
 */
export default function YouTubePlayer({ videoId, className }: YouTubePlayerProps) {
    const [loadVideo, setLoadVideo] = useState(false)
    const [videoReady, setVideoReady] = useState(false)
    const containerRef = useRef<HTMLDivElement | null>(null)

    // YouTube thumbnail URL (maxresdefault is the highest quality)
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

    useEffect(() => {
        const currentRef = containerRef.current

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {
                if (entries[0].isIntersecting) {
                    setLoadVideo(true)
                    observerInstance.unobserve(currentRef as Element)
                }
            },
            {
                rootMargin: '100px 0px',
            },
        )

        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [])

    // Set up event handlers
    const onReady = (event: YouTubeEvent) => {
        // Access the player instance
        // event.target is the YouTube player instance (YT.Player type)
        // Reference: https://developers.google.com/youtube/player_parameters
        const player = event.target as YT.Player

        // Mark video as ready for fade-in transition
        setVideoReady(true)

        // Suppress unused variable warning - player is available for future use
        void player
    }

    const onError = (event: YouTubeEvent<number>) => {
        console.error('YouTube Player Error:', event)
    }

    return (
        <div
            data-component="YouTubePlayer"
            ref={containerRef}
            className={cn('my-6 flex justify-center w-full', className)}
        >
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                {/* Thumbnail placeholder - always visible until video loads */}
                <div
                    className={cn(
                        'absolute top-0 left-0 w-full h-full transition-opacity duration-300',
                        videoReady ? 'opacity-0 pointer-events-none' : 'opacity-100',
                    )}
                >
                    <Image
                        src={thumbnailUrl}
                        alt="Video thumbnail"
                        fill
                        className="object-cover"
                        sizes="(max-width: 800px) 100vw, 800px"
                        unoptimized
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center transition-transform hover:scale-110">
                            <svg
                                className="w-12 h-12 text-white ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Video player - fades in when ready */}
                {loadVideo && (
                    <div
                        className={cn(
                            'absolute top-0 left-0 w-full h-full transition-opacity duration-300',
                            videoReady ? 'opacity-100' : 'opacity-0',
                        )}
                    >
                        <YouTube
                            videoId={videoId}
                            onReady={onReady}
                            onError={onError}
                            opts={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

