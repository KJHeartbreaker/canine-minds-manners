// TypeScript shims for side-effect CSS imports and global script APIs used in client components.

declare module 'swiper/css'
declare module 'swiper/css/free-mode'
declare module 'swiper/css/navigation'
declare module 'swiper/css/thumbs'
declare module 'swiper/css/pagination'
declare module 'swiper/css/*'

declare namespace YT {
  // `react-youtube` exposes the underlying YouTube IFrame API player as `event.target`.
  // We only use it as an opaque handle.
  type Player = any
}

