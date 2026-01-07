'use client'

import { useRef, useState, useEffect } from 'react'
import YouTube, { YouTubeEvent } from 'react-youtube'
import { cn } from '@/lib/utils'

interface YouTubePlayerProps {
    videoId: string
    className?: string
}

/**
 * Lazy-loaded YouTube Player Component
 * Only loads the video when it comes into viewport
 */
export default function YouTubePlayer({ videoId, className }: YouTubePlayerProps) {
    const [loadVideo, setLoadVideo] = useState(false)
    const containerRef = useRef<HTMLDivElement | null>(null)

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

        // For example, you can automatically play the video
        // player.playVideo()

        // Suppress unused variable warning - player is available for future use
        void player
    }

    const onError = (event: YouTubeEvent<number>) => {
        console.error('YouTube Player Error:', event)
    }

    return (
        <div data-component="YouTubePlayer" ref={containerRef} className={cn('my-6', className)}>
            {loadVideo && <YouTube videoId={videoId} onReady={onReady} onError={onError} />}
        </div>
    )
}

